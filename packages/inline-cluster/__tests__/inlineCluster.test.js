import { spacing } from "@bedrock-layout/spacing-constants";
import React from "react";
import { create } from "react-test-renderer";
import { ThemeProvider } from "styled-components";

import { InlineCluster } from "../src";

const Lorem = () => (
  <>
    {Array.from(Array(4).keys()).map((i) => (
      <p key={i}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
        vestibulum tortor, vitae venenatis lectus. Praesent gravida dapibus
        neque sit amet molestie. Morbi blandit eu dolor a luctus. Vestibulum
        sollicitudin elit ac nunc scelerisque rhoncus. Nulla felis sapien,
        condimentum ut imperdiet vel, aliquet id ante. Pellentesque habitant
        morbi tristique senectus et netus et malesuada fames ac turpis egestas.
        Quisque ultrices, quam nec scelerisque malesuada, lectus elit semper
        diam, ac placerat purus tortor et enim.
      </p>
    ))}
  </>
);

describe("InlineCluster", () => {
  describe("correct usage", () => {
    test("InlineCluster is not null", () => {
      expect(InlineCluster).toBeTruthy();
    });

    it("renders check for the browser", async () => {
      const oldDocument = document;
      // eslint-disable-next-line no-native-reassign
      document = undefined;

      const { InlineCluster } = await import("../src/index");

      const inlineCluster = create(
        <InlineCluster gutter="lg">
          <Lorem />
        </InlineCluster>
      );

      expect(inlineCluster.toJSON()).toMatchSnapshot();

      // eslint-disable-next-line no-native-reassign
      document = oldDocument;
    });

    it("renders all the gutter options", () => {
      Object.keys(spacing).forEach((gutter) => {
        const inlineCluster = create(
          <InlineCluster gutter={gutter}>
            <Lorem />
          </InlineCluster>
        );
        expect(inlineCluster.toJSON()).toMatchSnapshot();
      });
    });

    it("renders all the justify options", () => {
      ["start", "center", "end"].forEach((justify) => {
        const inlineCluster = create(
          <InlineCluster gutter="lg" justify={justify}>
            <Lorem />
          </InlineCluster>
        );
        expect(inlineCluster.toJSON()).toMatchSnapshot();
      });
    });

    it("renders all the align options", () => {
      ["start", "center", "end", "stretch"].forEach((align) => {
        const inlineCluster = create(
          <InlineCluster gutter="lg" align={align}>
            <Lorem />
          </InlineCluster>
        );
        expect(inlineCluster.toJSON()).toMatchSnapshot();
      });
    });

    it("renders with theme overrides", () => {
      const inlineCluster = create(
        <ThemeProvider theme={{ spacing: { "1x": "200px" } }}>
          <InlineCluster gutter="1x">
            <Lorem />
          </InlineCluster>
        </ThemeProvider>
      );
      expect(inlineCluster.toJSON()).toMatchSnapshot();
    });

    it("renders with theme overrides using numbers", () => {
      const inlineCluster = create(
        <ThemeProvider theme={{ spacing: { none: 0 } }}>
          <InlineCluster gutter="none">
            <Lorem />
          </InlineCluster>
        </ThemeProvider>
      );
      expect(inlineCluster.toJSON()).toMatchSnapshot();
    });

    it("accepts className prop", () => {
      const inlineCluster = create(
        <InlineCluster gutter="lg" className="CLASSNAME">
          <Lorem />
        </InlineCluster>
      );
      expect(inlineCluster.toJSON()).toMatchSnapshot();
    });
  });

  describe("incorrect usage", () => {
    beforeEach(() => {
      jest.spyOn(console, "error");
      console.error.mockImplementation(() => undefined);
    });
    afterEach(() => {
      console.error.mockRestore();
    });

    it("renders default with console error with no gutter input", () => {
      expect(console.error).not.toBeCalled();

      const errorStack = create(
        <InlineCluster>
          <Lorem />
        </InlineCluster>
      );

      expect(console.error).toBeCalled();
      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("renders default with wrong gutter input", () => {
      expect(console.error).not.toBeCalled();

      const errorStack = create(
        <InlineCluster gutter="incorrect">
          <Lorem />
        </InlineCluster>
      );

      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it("renders default with console error with incorrect justify", () => {
      expect(console.error).not.toBeCalled();

      const errorStack = create(
        <InlineCluster gutter="lg" justify="incorrect">
          <Lorem />
        </InlineCluster>
      );

      expect(console.error).toBeCalled();
      expect(errorStack.toJSON()).toMatchSnapshot();
    });
    it("renders default with console error with incorrect align", () => {
      expect(console.error).not.toBeCalled();

      const errorStack = create(
        <InlineCluster gutter="lg" align="incorrect">
          <Lorem />
        </InlineCluster>
      );

      expect(console.error).toBeCalled();
      expect(errorStack.toJSON()).toMatchSnapshot();
    });
  });
});
