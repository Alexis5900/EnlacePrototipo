import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LoginPage } from "./components/LoginPage";
import { ForgotPasswordPage } from "./components/ForgotPasswordPage";
import { UserAdministration } from "./components/UserAdministration";
import { ITRequestsPage } from "./components/ITRequestsPage";
import { NavigationLoader } from "./components/NavigationLoader";

type Screen = "login" | "forgot-password" | "user-admin" | "it-requests";
type MenuType = "horizontal" | "vertical";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("login");
  const [isLoading, setIsLoading] = useState(false);
  const [pendingScreen, setPendingScreen] = useState<Screen | null>(null);
  const [menuType, setMenuType] = useState<MenuType>(() => {
    // Load menu preference from localStorage
    const saved = localStorage.getItem("chubb-menu-type");
    return (saved as MenuType) || "horizontal";
  });

  const handleNavigation = (screen: Screen) => {
    // Don't show loading for login/forgot password navigation
    if (screen === "login" || screen === "forgot-password" || 
        currentScreen === "login" || currentScreen === "forgot-password") {
      setCurrentScreen(screen);
      return;
    }

    // Show loading for main app navigations
    setIsLoading(true);
    setPendingScreen(screen);
  };

  const toggleMenuType = () => {
    const newMenuType = menuType === "horizontal" ? "vertical" : "horizontal";
    setMenuType(newMenuType);
    localStorage.setItem("chubb-menu-type", newMenuType);
  };

  useEffect(() => {
    if (isLoading && pendingScreen) {
      const timer = setTimeout(() => {
        setCurrentScreen(pendingScreen);
        setPendingScreen(null);
        setIsLoading(false);
      }, 2000); // 2 seconds loading

      return () => clearTimeout(timer);
    }
  }, [isLoading, pendingScreen]);

  if (isLoading) {
    return <NavigationLoader />;
  }

  // Animation variants for page transitions
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.98
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1], // Custom easing for luxury feel
        when: "beforeChildren"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.98,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 1, 1]
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {currentScreen === "login" && (
        <motion.div
          key="login"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <LoginPage 
            onForgotPassword={() => handleNavigation("forgot-password")}
            onLoginSuccess={() => handleNavigation("user-admin")}
          />
        </motion.div>
      )}
      {currentScreen === "forgot-password" && (
        <motion.div
          key="forgot-password"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <ForgotPasswordPage onBack={() => handleNavigation("login")} />
        </motion.div>
      )}
      {currentScreen === "user-admin" && (
        <motion.div
          key="user-admin"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <UserAdministration 
            onLogout={() => handleNavigation("login")} 
            onNavigateToITRequests={() => handleNavigation("it-requests")}
            menuType={menuType}
            onToggleMenuType={toggleMenuType}
          />
        </motion.div>
      )}
      {currentScreen === "it-requests" && (
        <motion.div
          key="it-requests"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <ITRequestsPage 
            onLogout={() => handleNavigation("login")}
            onNavigateToUsers={() => handleNavigation("user-admin")}
            menuType={menuType}
            onToggleMenuType={toggleMenuType}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}