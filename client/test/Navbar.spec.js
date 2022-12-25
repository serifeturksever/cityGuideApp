/* eslint-disable no-undef */
import { mount } from "@vue/test-utils";
import Navbar from "../src/components/Navbar.vue";

describe("Navbar.vue", () => {
  const wrapper = mount(Navbar);

  describe.skip("should setup jest", () => {
    test("should setup properly", () => {
      expect(true).toBe(true);
    });
    test("should render Navbar", () => {
      expect(wrapper).toBeTruthy();
    });
  });

  describe.skip("a tag tests", () => {
    test("should find 4 a tag in navbar", async () => {
      const { length } = await wrapper.findAll("#navbar a");
      expect(length).toEqual(4);
    });
    test("should find 4 a tag in hamburger-menu", async () => {
      const { length } = await wrapper.findAll("#hamburger-menu a");
      expect(length).toEqual(4);
    });
  });

  describe.skip("testing alert function when clicked -Buy Transport Card- link", () => {
    window.alert = jest.fn();

    test("link in Navbar", async () => {
      await wrapper.find("#navbar .right a").trigger("click");

      expect(window.alert).toBeCalledWith(
        "This feature is not implemented yet!"
      );
    });
    test("link in hamburger-menu", async () => {
      await wrapper
        .findAll("#hamburger-menu .hamburger-container .hamburger-links a")
        .at(2)
        .trigger("click");

      expect(window.alert).toBeCalledWith(
        "This feature is not implemented yet!"
      );
    });
  });
});
