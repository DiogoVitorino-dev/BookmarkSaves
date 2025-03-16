const random = (min = 0, max = 1) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const commonAnimationOptions: KeyframeAnimationOptions = {
  easing: "cubic-bezier(0.32, 0, 0.67, 0)",
  direction: "alternate",
  iterations: Infinity,
};

function movement(cloud: Element) {
  cloud
    .animate([{ translate: "-15%" }, { translate: "15%" }], {
      duration: random(8000, 10000),
      iterationComposite:"replace",
      ...commonAnimationOptions,
    })
    .play();
}

function rotation(cloud: Element) {
  cloud
    .animate(
      [
        { rotate: `${random(-20, 20)}deg` },
        { rotate: `${random(-20, 20)}deg` },
      ],
      {
        duration: random(15000, 20000),
        ...commonAnimationOptions,
      }
    )
    .play();
}

function size(cloud: Element) {
  cloud
    .animate([{ scale: 0.95 }, { scale: 1.15 }], {
      duration: random(10000, 20000),
      ...commonAnimationOptions,
    })
    .play();
}

export function cloudAnimation(clouds?: HTMLCollectionOf<Element>) {
  if (!clouds || !clouds.length) return;

  for (const cloud of clouds) {
    movement(cloud);
    rotation(cloud);
    size(cloud);
  }
}
