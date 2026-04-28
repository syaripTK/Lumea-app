import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const notyf = new Notyf({
  duration: 4000,
  position: {
    x: "right",
    y: "bottom",
  },
});

const notyfSuccess = (message) => {
  notyf.success({
    message: `<b style="letter-spacing: 1px">Success:</b> ${message}`,
  });
};

const notyfError = (message) => {
  notyf.error({
    message: `<b style="letter-spacing: 1px">Error:</b> ${message}`,
  });
};

const notyfInfo = (message) => {
  notyf.open({
    type: "info",
    message: `<b style="letter-spacing: 1px">Info:</b> ${message}`,
    background: "#3b82f6",
  });
};

export { notyfError, notyfSuccess, notyfInfo };
