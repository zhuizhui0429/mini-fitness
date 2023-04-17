const path = require("path");

const config = {
  projectName: "fitness-front",
  date: "2023-1-1",
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: "src",
  outputRoot: "dist",
  plugins: ["@tarojs/plugin-html"],
  defineConstants: {},
  copy: {
    patterns: [],
    options: {},
  },
  framework: "react",
  compiler: "webpack5",
  cache: {
    // enable: true, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  compiler: {
    type: "webpack5",
    // 仅 webpack5 支持依赖预编译配置
    prebundle: {
      enable: true,
    },
  },
  mini: {
    optimizeMainPackage: {
      enable: true,
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          selectorBlackList: ["nut-"],
        },
      },
      url: {
        enable: true,
        config: {
          limit: 1024 * 10, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
    alias: {
      "@/comp": path.resolve(__dirname, "..", "src/components"),
      "@/api": path.resolve(__dirname, "..", "src/api"),
      "@/pages": path.resolve(__dirname, "..", "src/pages"),
      "@/add": path.resolve(__dirname, "..", "src/packageDiet/pages/add"),
      "@/dietDetail": path.resolve(
        __dirname,
        "..",
        "src/packageDiet/pages/dietDetail"
      ),
      "@/context": path.resolve(__dirname, "..", "src/globalCtx.tsx"),
    },
    sass: {
      resource: [
        path.resolve(__dirname, "..", "src/styles/variable.scss"),
        path.resolve(__dirname, "..", "src/styles/mixin.scss"),
      ],
      data: `@import "@nutui/nutui-react-taro/dist/styles/variables.scss";`,
    },
    webpackChain: (chain) => {
      // chain.merge({
      //   plugin: {
      //     install: {
      //       plugin: require("terser-webpack-plugin"),
      //       args: [
      //         {
      //           terserOptions: {
      //             compress: true, // 默认使用terser压缩
      //             // mangle: false,
      //             keep_classnames: true, // 不改变class名称
      //             keep_fnames: true, // 不改变函数名称
      //           },
      //         },
      //       ],
      //     },
      //   },
      // });
      // chain.optimization.sideEffects(false);
    },
  },
  h5: {
    publicPath: "/",
    staticDirectory: "static",
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
  },
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === "development") {
    return merge({}, config, require("./dev"));
  }
  return merge({}, config, require("./prod"));
};
