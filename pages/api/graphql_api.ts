import { createProxyMiddleware } from "http-proxy-middleware";

export const config = {
  api: {
    bodyParser: false,
    externalResolvers: true,
  },
};

const proxy = createProxyMiddleware({
  target: "https://api.sorare.com/graphql",
  changeOrigin: true,
  secure: false,
});

export default proxy;
