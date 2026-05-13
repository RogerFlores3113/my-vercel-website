import { describe, it, expect, vi } from "vitest";

// Mirrors the handler logic in ComingSoonModal.tsx
function makeModalHandlers(onClose: () => void) {
  function handleBackdropClick(target: EventTarget | null, currentTarget: EventTarget | null) {
    if (target === currentTarget) onClose();
  }

  function handleKeyDown(key: string) {
    if (key === "Escape") onClose();
  }

  return { handleBackdropClick, handleKeyDown };
}

describe("ComingSoonModal handler logic", () => {
  it("clicking backdrop calls onClose", () => {
    const onClose = vi.fn();
    const { handleBackdropClick } = makeModalHandlers(onClose);
    const el = {};
    handleBackdropClick(el, el); // target === currentTarget → backdrop click
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("clicking inside modal does NOT call onClose", () => {
    const onClose = vi.fn();
    const { handleBackdropClick } = makeModalHandlers(onClose);
    handleBackdropClick({}, {}); // target !== currentTarget → inner click
    expect(onClose).not.toHaveBeenCalled();
  });

  it("Escape key calls onClose", () => {
    const onClose = vi.fn();
    const { handleKeyDown } = makeModalHandlers(onClose);
    handleKeyDown("Escape");
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("other keys do NOT call onClose", () => {
    const onClose = vi.fn();
    const { handleKeyDown } = makeModalHandlers(onClose);
    handleKeyDown("Enter");
    expect(onClose).not.toHaveBeenCalled();
  });
});
