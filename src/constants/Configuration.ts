export default {
  supportedOrigins: {
    x: "https://x.com",
  },
  NativeMessage: {
    helper: {
      name: "bookmarkSavesHelper",
      server: "ws://localhost:8766",
      skipStartup: false,
      protocols: {
        video: "video",
      },
    },
  },
};
