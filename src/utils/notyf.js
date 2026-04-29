import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const notyf = new Notyf({
  duration: 5000,
  position: {
    x: "right",
    y: "top",
  },
  ripple: true,
  dismissible: true,
  types: [
    {
      type: "success",
      background: "#10b981",
      className: "notyf-premium",
      duration: 4000,
      icon: false,
    },
    {
      type: "error",
      background: "#ef4444",
      className: "notyf-premium",
      duration: 5000,
      icon: false,
    },
    {
      type: "info",
      background: "#3b82f6",
      className: "notyf-premium",
      duration: 4000,
      icon: false,
    },
    {
      type: "warning",
      background: "#f59e0b",
      className: "notyf-premium",
      duration: 4000,
      icon: false,
    },
  ],
});

const notyfSuccess = (message) => {
  notyf.open({
    type: "success",
    message: `
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="background: rgba(255,255,255,0.2); padding: 6px; border-radius: 10px; display: flex; align-items: center; justify-content: center;">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <div>
          <div style="font-weight: 800; font-size: 14px; letter-spacing: -0.5px; margin-bottom: 2px;">BERHASIL</div>
          <div style="font-weight: 500; font-size: 13px; opacity: 0.9;">${message}</div>
        </div>
      </div>
    `,
  });
};

const notyfError = (message) => {
  notyf.open({
    type: "error",
    message: `
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="background: rgba(255,255,255,0.2); padding: 6px; border-radius: 10px; display: flex; align-items: center; justify-content: center;">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
        </div>
        <div>
          <div style="font-weight: 800; font-size: 14px; letter-spacing: -0.5px; margin-bottom: 2px;">GAGAL</div>
          <div style="font-weight: 500; font-size: 13px; opacity: 0.9;">${message}</div>
        </div>
      </div>
    `,
  });
};

const notyfInfo = (message) => {
  notyf.open({
    type: "info",
    message: `
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="background: rgba(255,255,255,0.2); padding: 6px; border-radius: 10px; display: flex; align-items: center; justify-content: center;">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
        </div>
        <div>
          <div style="font-weight: 800; font-size: 14px; letter-spacing: -0.5px; margin-bottom: 2px;">INFORMASI</div>
          <div style="font-weight: 500; font-size: 13px; opacity: 0.9;">${message}</div>
        </div>
      </div>
    `,
  });
};

const notyfWarning = (message) => {
  notyf.open({
    type: "warning",
    message: `
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="background: rgba(255,255,255,0.2); padding: 6px; border-radius: 10px; display: flex; align-items: center; justify-content: center;">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
        </div>
        <div>
          <div style="font-weight: 800; font-size: 14px; letter-spacing: -0.5px; margin-bottom: 2px;">PERINGATAN</div>
          <div style="font-weight: 500; font-size: 13px; opacity: 0.9;">${message}</div>
        </div>
      </div>
    `,
  });
};

export { notyfError, notyfSuccess, notyfInfo, notyfWarning };
