import { describe, it, expect, vi, beforeEach } from "vitest";

// Mirrors the useEffect logic in page.tsx
function resolvePhase(
  getItem: (key: string) => string | null,
  replace: (url: string) => void
): "splash" | "game" {
  let phase: "splash" | "game" = "splash";
  try {
    const stored = getItem("rflor-site-mode");
    if (stored === "game") phase = "game";
    else if (stored === "boring") replace("/boring");
  } catch {}
  return phase;
}

describe("page.tsx localStorage logic", () => {
  let replaceSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    replaceSpy = vi.fn();
  });

  it("stored='game' → resolves to game phase", () => {
    const phase = resolvePhase(() => "game", replaceSpy);
    expect(phase).toBe("game");
    expect(replaceSpy).not.toHaveBeenCalled();
  });

  it("stored='boring' → calls replace('/boring') and stays splash", () => {
    const phase = resolvePhase(() => "boring", replaceSpy);
    expect(replaceSpy).toHaveBeenCalledWith("/boring");
    expect(phase).toBe("splash");
  });

  it("stored=null (first visit) → stays on splash, no redirect", () => {
    const phase = resolvePhase(() => null, replaceSpy);
    expect(phase).toBe("splash");
    expect(replaceSpy).not.toHaveBeenCalled();
  });

  it("localStorage throws (private browsing) → stays on splash, no crash", () => {
    const phase = resolvePhase(() => { throw new Error("SecurityError"); }, replaceSpy);
    expect(phase).toBe("splash");
    expect(replaceSpy).not.toHaveBeenCalled();
  });
});
