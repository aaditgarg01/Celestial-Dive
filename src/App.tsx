import { ErrorBoundary } from './components/ErrorBoundary';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './features/Hero';
import { About } from './features/About';
import { Experience } from './features/Experience';
import { SkyGuide } from './features/SkyGuide';
import { Legacy } from './features/Legacy';
import { Gallery } from './features/Gallery';
import { FAQ } from './features/FAQ';
import { Icon } from './components/Icon';
import { useReveals } from './hooks/useReveals';
import { useInitialAnchor } from './hooks/useInitialAnchor';
export function App() {
  useReveals();
  useInitialAnchor();
  return (
    <ErrorBoundary>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <div className="night-ribbon" aria-hidden="true">
          <span>LOOK UP</span>
          <Icon name="spark" />
          <span>GET CURIOUS</span>
          <Icon name="spark" />
          <span>FEEL SMALL</span>
          <Icon name="spark" />
          <span>DREAM BIG</span>
          <Icon name="spark" />
          <span>CELESTIAL DIVE 5.0</span>
        </div>
        <About />
        <Experience />
        <SkyGuide />
        <Legacy />
        <Gallery />
        <FAQ />
      </main>
      <Footer />
    </ErrorBoundary>
  );
}
