import Navbar from "@/components/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import WhySection from "@/components/landing/WhySection";
import ForWhoSection from "@/components/landing/ForWhoSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import TrustSection from "@/components/landing/TrustSection";
import FooterSection from "@/components/landing/FooterSection";

interface LandingPageProps {
  user: any;
  onLogout: () => void;
}

const LandingPage = ({ user, onLogout }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} onLogout={onLogout} />
      <HeroSection user={user} />
      <WhySection user={user} />
      <ForWhoSection />
      <HowItWorksSection />
      <TrustSection />
      <FooterSection />
    </div>
  );
};

export default LandingPage;
