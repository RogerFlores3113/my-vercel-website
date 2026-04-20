import { describe, it, expect, vi, beforeEach } from "vitest";

// Mirrors the handler logic in WelcomeSplash.tsx
function makeHandlers(
  setItem: (key: string, value: string) => void,
  onEnter: () => void
) {
  function handleEnter() {
    try { setItem("rflor-site-mode", "game"); } catch {}
    onEnter();
  }

  function handleBoring() {
    try { setItem("rflor-site-mode", "boring"); } catch {}
  }

  return { handleEnter, handleBoring };
}

describe("WelcomeSplash handler logic", () => {
  let setItemSpy: ReturnType<typeof vi.fn>;
  let onEnterSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    setItemSpy = vi.fn();
    onEnterSpy = vi.fn();
  });

  it("Enter button → sets localStorage='game' and calls onEnter()", () => {
    const { handleEnter } = makeHandlers(setItemSpy, onEnterSpy);
    handleEnter();
    expect(setItemSpy).toHaveBeenCalledWith("rflor-site-mode", "game");
    expect(onEnterSpy).toHaveBeenCalledOnce();
  });

  it("Boring mode link → sets localStorage='boring'", () => {
    const { handleBoring } = makeHandlers(setItemSpy, onEnterSpy);
    handleBoring();
    expect(setItemSpy).toHaveBeenCalledWith("rflor-site-mode", "boring");
    expect(onEnterSpy).not.toHaveBeenCalled();
  });
});
