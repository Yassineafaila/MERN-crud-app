const Hover = {
  scale: 1,
  transition: {
    duration: 0.5,
  },
};
const slideTop = {
  hidden: {
    y: "-100vh",
  },
  visible: {
    y: "0",
    transition: {
      type: "spring",
      delay: 0.7,
      damping: 20,
    },
  },
};
export { Hover,slideTop };
