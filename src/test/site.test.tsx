import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { App } from '../App';
import { SkyGuide } from '../features/SkyGuide';
import { Legacy } from '../features/Legacy';
import { Gallery } from '../features/Gallery';
import { Experience } from '../features/Experience';
import { event, navigation } from '../config/site';

it('provides every section and valid internal destinations without carrying Aerovate event claims', () => {
  const { container } = render(<App />);
  navigation.forEach((item) => expect(document.getElementById(item.id)).toBeInTheDocument());
  for (const link of container.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'))
    expect(document.querySelector(link.getAttribute('href')!)).not.toBeNull();
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('The sky is calling.');
  expect(container).not.toHaveTextContent(/Aerovate|Thrust Tech|September|supervised launch/);
  expect(event.registrationUrl).toBe('');
  expect(container.querySelectorAll('a[href=""]')).toHaveLength(0);
  expect(container.querySelectorAll('a[target="_blank"]:not([rel*="noreferrer"])')).toHaveLength(0);
});
it('opens and closes the navigation with Escape, restoring focus and page scrolling', () => {
  render(<App />);
  const trigger = screen.getByRole('button', { name: 'Open menu' });
  fireEvent.click(trigger);
  const menu = screen.getByRole('dialog', { name: 'Main navigation' });
  expect(menu).toHaveAttribute('open');
  expect(document.body.style.overflow).toBe('hidden');
  fireEvent(menu, new Event('cancel', { bubbles: false, cancelable: true }));
  expect(menu).not.toHaveAttribute('open');
  expect(trigger).toHaveFocus();
  expect(trigger).toHaveAttribute('aria-expanded', 'false');
  expect(document.body.style.overflow).toBe('');
});
it('closes the menu when an in-page destination is selected', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));
  fireEvent.click(
    within(screen.getByRole('dialog')).getByRole('link', { name: /Explore the sky/ }),
  );
  expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute(
    'aria-expanded',
    'false',
  );
  expect(document.body.style.overflow).toBe('');
});
it('explores a constellation and can hide connections without removing accessible star controls', () => {
  render(<SkyGuide />);
  fireEvent.click(screen.getByRole('button', { name: 'Explore Rigel' }));
  expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Rigel');
  expect(screen.getByRole('button', { name: 'Explore Rigel' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  fireEvent.click(screen.getByRole('button', { name: 'Hide connections' }));
  expect(screen.getByRole('button', { name: 'Connect the stars' })).toHaveAttribute(
    'aria-pressed',
    'false',
  );
  expect(screen.getAllByRole('button', { name: /^Explore / })).toHaveLength(7);
});
it('supports roving keyboard focus and associated panels for archive editions', () => {
  render(<Legacy />);
  const fifth = screen.getByRole('tab', { name: /5.0/ });
  fireEvent.keyDown(fifth, { key: 'ArrowLeft' });
  const fourth = screen.getByRole('tab', { name: /4.0/ });
  expect(fourth).toHaveFocus();
  expect(fourth).toHaveAttribute('aria-selected', 'true');
  expect(screen.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', fourth.id);
  fireEvent.keyDown(fourth, { key: 'Home' });
  expect(screen.getByRole('tab', { name: /1.0/ })).toHaveFocus();
  fireEvent.keyDown(screen.getByRole('tab', { name: /1.0/ }), { key: 'End' });
  expect(fifth).toHaveFocus();
  expect(screen.getByRole('tabpanel')).toHaveTextContent('Our next chapter is above us.');
});
it('shows honest artwork placeholders until approved event photographs are supplied', () => {
  const { container } = render(<Gallery />);
  expect(screen.getByLabelText(/Gallery preview artwork/)).toBeInTheDocument();
  expect(container.querySelectorAll('img')).toHaveLength(0);
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
const photos = [
  {
    id: 'one',
    src: '/assets/gallery/one.webp',
    alt: 'Telescope one',
    caption: 'First night',
    edition: '1.0',
    width: 800,
    height: 600,
  },
  {
    id: 'two',
    src: '/assets/gallery/two.webp',
    alt: 'Telescope two',
    caption: 'Second night',
    edition: '2.0',
    width: 800,
    height: 600,
  },
];
it('filters real photos, browses the modal with arrow keys and recovers from a missing image', () => {
  render(<Gallery items={photos} />);
  fireEvent.click(screen.getByRole('button', { name: 'View First night' }));
  let viewer = screen.getByRole('dialog', { name: 'Photograph viewer' });
  expect(viewer).toHaveAttribute('open');
  fireEvent.keyDown(viewer, { key: 'ArrowRight' });
  expect(within(viewer).getByText('Second night')).toBeInTheDocument();
  fireEvent.error(within(viewer).getByRole('img', { name: 'Telescope two' }));
  expect(within(viewer).getByRole('status')).toHaveTextContent('could not be loaded');
  fireEvent.click(within(viewer).getByRole('button', { name: 'Close photograph' }));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(document.body.style.overflow).toBe('');
  fireEvent.click(screen.getByRole('button', { name: 'Edition 1.0' }));
  expect(screen.queryByRole('button', { name: 'View Second night' })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'View First night' }));
  viewer = screen.getByRole('dialog');
  expect(within(viewer).getByRole('button', { name: 'Next photograph' })).toBeDisabled();
});
it('runs at most one pointer frame and cancels it during scrolling or teardown', () => {
  let id = 0;
  const frames = new Map<number, FrameRequestCallback>();
  vi.stubGlobal('requestAnimationFrame', (fn: FrameRequestCallback) => {
    frames.set(++id, fn);
    return id;
  });
  vi.stubGlobal('cancelAnimationFrame', (n: number) => frames.delete(n));
  vi.stubGlobal('matchMedia', (query: string) =>
    Object.assign(new EventTarget(), { matches: !query.includes('reduced') }),
  );
  const view = render(<Experience />);
  const card = view.container.querySelector<HTMLElement>('.telescope-card')!;
  vi.spyOn(card, 'getBoundingClientRect').mockReturnValue({
    left: 0,
    top: 0,
    width: 500,
    height: 500,
  } as DOMRect);
  const move = () => {
    const e = new MouseEvent('pointermove', { bubbles: true, clientX: 100, clientY: 200 });
    Object.defineProperty(e, 'pointerType', { value: 'mouse' });
    fireEvent(card, e);
  };
  move();
  move();
  expect(frames.size).toBe(1);
  act(() => {
    const callbacks = [...frames.values()];
    frames.clear();
    callbacks.forEach((fn) => fn(16));
  });
  expect(card.dataset.pointer).toBe('true');
  expect(frames.size).toBe(0);
  move();
  fireEvent.scroll(window);
  expect(frames.size).toBe(0);
  expect(card.dataset.pointer).toBeUndefined();
  move();
  view.unmount();
  expect(frames.size).toBe(0);
});
it('leaves cursor artwork static for reduced motion', () => {
  const raf = vi.fn();
  vi.stubGlobal('requestAnimationFrame', raf);
  vi.stubGlobal('matchMedia', () => Object.assign(new EventTarget(), { matches: true }));
  const view = render(<Experience />);
  const e = new MouseEvent('pointermove', { bubbles: true, clientX: 100, clientY: 200 });
  Object.defineProperty(e, 'pointerType', { value: 'mouse' });
  fireEvent(view.container.querySelector('.telescope-card')!, e);
  expect(raf).not.toHaveBeenCalled();
});

it('restores direct section links after React mounts without adding history entries', () => {
  history.replaceState(null, '', '/#contact');
  const frames: FrameRequestCallback[] = [];
  vi.stubGlobal('requestAnimationFrame', (fn: FrameRequestCallback) => {
    frames.push(fn);
    return frames.length;
  });
  vi.stubGlobal('cancelAnimationFrame', vi.fn());
  const { container } = render(<App />);
  const contact = container.querySelector<HTMLElement>('#contact')!;
  const jump = vi.spyOn(contact, 'scrollIntoView');
  act(() => frames.splice(0).forEach((fn) => fn(16)));
  expect(jump).toHaveBeenCalledWith({ behavior: 'instant' });
  expect(location.hash).toBe('#contact');
});
