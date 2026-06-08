import { ServicePage } from "../../types/content";

export const mobileAppDev: ServicePage = {
  title: "Mobile App Development in Kenya",
  slug: "mobile-app-development-kenya",
  summary: "High-performance iOS and Android applications designed for engaging user experiences and robust functionality.",
  description: "Reach your customers wherever they are with intuitive, fast, and secure mobile applications. We specialize in cross-platform frameworks like React Native to deliver apps on both iOS and Android simultaneously without compromising on native-like performance. From consumer-facing apps to internal field-service tools, we bring your mobile vision to life.",
  features: [
    "Cross-Platform Development (iOS & Android)",
    "Native Device Feature Integration (Camera, GPS)",
    "Offline-First Architecture",
    "Push Notifications & Real-Time Sync",
    "App Store & Google Play Deployment"
  ],
  benefits: [
    "Faster time-to-market with a unified codebase",
    "Engage users directly via push notifications",
    "Secure and reliable performance even on poor networks"
  ],
  faqs: [
    {
      q: "Do you develop for both iOS and Android?",
      a: "Yes. We utilize cross-platform technologies to build once and deploy to both the Apple App Store and Google Play Store efficiently."
    },
    {
      q: "Can the app work offline?",
      a: "Absolutely. We can architect 'offline-first' applications that sync data seamlessly once the device reconnects to the internet."
    }
  ],
  metaDescription: "Expert mobile app development in Kenya. We build high-performance iOS and Android applications using modern cross-platform technology."
};

export default mobileAppDev;
