export const scrollToComponent = (component: string) => {
  // scroll function to scroll user to a component
  const element = document.getElementById(component);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
