/*
 * Copyright (c) 2016-2020 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import '@clr/core/button/register.js';
import '@clr/core/icon/register.js';
import { CdsIcon } from '@clr/core/icon';
import { CdsIconButton, ClrLoadingState } from '@clr/core/button';
import { componentIsStable, createTestElement, removeTestElement, waitForComponent } from '@clr/core/test/utils';

describe('Icon button element – ', () => {
  let testElement: HTMLElement;
  let component: CdsIconButton;

  beforeEach(async () => {
    testElement = createTestElement();
    testElement.innerHTML = `
      <form>
        <cds-icon-button><cds-icon></cds-icon></cds-icon-button>
      </form>
    `;

    await waitForComponent('cds-icon-button');
    component = testElement.querySelector<CdsIconButton>('cds-icon-button');
  });

  afterEach(() => {
    removeTestElement(testElement);
  });

  it('should create the component', async () => {
    await componentIsStable(component);
    expect(component.querySelector('cds-icon')).not.toBe(null);
  });

  describe('LoadingStateChange: ', () => {
    it('should set default state as expected', async () => {
      await componentIsStable(component);
      component.loadingState = ClrLoadingState.DEFAULT;
      await componentIsStable(component);
      expect(component.hasAttribute('disabled')).toEqual(false);
    });

    it('should set loading state as expected', async () => {
      await componentIsStable(component);
      const size = component.getBoundingClientRect().width;
      component.loadingState = ClrLoadingState.LOADING;
      await componentIsStable(component);

      // I'm getting 152.016px and 152.015625px, so the test fails without rounding
      expect(component.getBoundingClientRect().width.toFixed(3)).toEqual(size.toFixed(3));
      expect(component.hasAttribute('disabled')).toEqual(true);
    });

    it('should set success state as expected', async () => {
      await componentIsStable(component);
      const size = component.getBoundingClientRect().width;

      component.loadingState = ClrLoadingState.SUCCESS;
      await componentIsStable(component);

      expect(component.getBoundingClientRect().width.toFixed(3)).toEqual(size.toFixed(3));
      expect(component.hasAttribute('disabled')).toEqual(true);
    });

    it('should set error state as expected', async () => {
      await componentIsStable(component);
      const size = component.getBoundingClientRect().width;

      component.loadingState = ClrLoadingState.ERROR;
      await componentIsStable(component);

      expect(component.getBoundingClientRect().width.toFixed(3)).toEqual(size.toFixed(3));
      expect(component.hasAttribute('disabled')).toEqual(true);
    });
  });

  describe('Button Behaviors: ', () => {
    xit('should warn on a missing aria-label', async () => {
      // await componentIsStable(component);
      // const button = component.querySelector('button');
      // expect(button).toBeDefined();
      // expect(button.hasAttribute('aria-hidden')).toBe(true);
      // expect(button.getAttribute('aria-hidden')).toBe('true');
    });

    it('should have a role of type button', async () => {
      await componentIsStable(component);
      expect(component.getAttribute('role')).toBe('button');
    });
  });
});

describe('Anchor Tags in Buttons: ', () => {
  let testElement: HTMLElement;
  let component: CdsIconButton;
  let anchor: HTMLElement;
  let icon: CdsIcon;

  beforeEach(async () => {
    testElement = createTestElement();
    testElement.innerHTML = `
      <form>
        <cds-icon-button><a href="javascript:void(0)"><cds-icon></cds-icon></a></cds-icon-button>
      </form>
    `;

    await waitForComponent('cds-icon-button');
    component = testElement.querySelector<CdsIconButton>('cds-icon-button');
    anchor = component.querySelector('a');
    icon = component.querySelector('cds-icon');
  });

  afterEach(() => {
    removeTestElement(testElement);
  });

  it('should set anchored icon class', async () => {
    expect(anchor).toBeDefined();
    expect(icon).toBeDefined();
    expect(icon.classList.contains('anchored-icon')).toBe(true);
  });
});
