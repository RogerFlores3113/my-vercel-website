"use client";

import { useEffect, useRef, useState } from "react";
import { GameLoader } from "./GameLoader";

// ─── Room config (order = left-to-right in the world) ─────────────────────────
const ROOMS = [
  { key: "landing",  modalId: "landing"  },
  { key: "projects", modalId: "projects" },
  { key: "about",    modalId: "about"    },
  { key: "reading",  modalId: "reading"  },
] as const;

// ─── Modal content ─────────────────────────────────────────────────────────────
// Real HTML rendered in a React overlay — links, formatting all work fine.
function ModalContent({ id }: { id: string }) {
  const s = { p: { marginBottom: 10, fontSize: 13, lineHeight: 1.7 } as React.CSSProperties };

  if (id === "landing") return (
    <>
      <p style={s.p}>
        Software engineer at the intersection of full-stack and AI.
        I&apos;m happiest when a problem requires both technical depth and
        talking to real people.
      </p>
      <p style={s.p}>
        Currently looking for SWE / AI engineering roles.
      </p>
      <p style={s.p}>
        <a href="mailto:rflores3113@gmail.com" style={{ color: "#5dcaa5" }}>
          rflores3113@gmail.com
        </a>
        {" · "}
        <a href="https://github.com/RogerFlores3113" target="_blank" style={{ color: "#5dcaa5" }}>
          GitHub
        </a>
        {" · "}
        <a href="https://www.linkedin.com/in/roger-flores-3113-nu/" target="_blank" style={{ color: "#5dcaa5" }}>
          LinkedIn
        </a>
      </p>
    </>
  );

  if (id === "projects") return (
    <>
      <p style={{ ...s.p, color: "#9fe1cb", fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>Professional</p>
      <p style={s.p}>
        <strong style={{ color: "#e8e6e1" }}>Property Appraisal Platform</strong>
        <br />
        Led pilot deployment for two county governments. Requirements gathering,
        ML feature engineering, React frontend. Shipped to production despite messy
        cross-org data pipelines.
        <br />
        <span style={{ color: "#5dcaa5", fontSize: 11 }}>React · Python · SQL · Cassandra</span>
      </p>
      <p style={s.p}>
        <strong style={{ color: "#e8e6e1" }}>Inventory Optimization Platform</strong>
        <br />
        AI-powered demand forecasting for Fortune 500 energy and steel companies.
        Full-stack work across React UI and large-scale database ops.
        <br />
        <span style={{ color: "#5dcaa5", fontSize: 11 }}>React · Python · SQL · Cassandra</span>
      </p>
      <p style={{ ...s.p, color: "#9fe1cb", fontSize: 11, textTransform: "uppercase", letterSpacing: 1, marginTop: 16 }}>Personal</p>
      <p style={s.p}>
        <strong style={{ color: "#e8e6e1" }}>Law Firm Lead Scraper</strong> — 3-day build.
        URL in → structured Excel out. Python + Selenium.
      </p>
      <p style={s.p}>
        <strong style={{ color: "#e8e6e1" }}>Minecraft Escape Room</strong> — ~4hrs of gameplay,
        second room in progress. Same systems-thinking muscles as real engineering.
      </p>
    </>
  );

  if (id === "about") return (
    <>
      <p style={s.p}>
        My professional work ranges from ML-powered inventory optimization for
        Fortune 500 companies to deploying property appraisal systems for county
        governments. Client-facing, ambiguous, real-world problems are where
        I do my best work.
      </p>
      <p style={{ ...s.p, color: "#9fe1cb", fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>Now</p>
      <p style={s.p}>
        Building{" "}
        <a href="https://podium-beta.vercel.app/" target="_blank" style={{ color: "#5dcaa5" }}>Podium</a>
        , an LLM assistant. Beta is live.
        <br />
        Training toward my private pilot&apos;s license.
        <br />
        Running Karpathy&apos;s nanochat on a 4080 Super instead of 8×H100s.
      </p>
      <p style={s.p}>
        Board games (Terraforming Mars, Blood on the Clocktower), rock climbing,
        flying, reading, and still searching for the perfect morning green tea.
      </p>
    </>
  );

  if (id === "reading") return (
    <>
      <p style={{ ...s.p, color: "#9fe1cb" }}>2026 reads</p>
      <p style={s.p}>
        <strong style={{ color: "#e8e6e1" }}>Foundation</strong> — Asimov
        <br />
        <span style={{ color: "#5dcaa5", fontSize: 11 }}>Worth reading</span>
        {" · "}1950s vibes but fascinating to see where sci-fi started.
      </p>
      <p style={s.p}>
        <strong style={{ color: "#e8e6e1" }}>A Random Walk Down Wall Street</strong> — Malkiel
        <br />
        <span style={{ color: "#5dcaa5", fontSize: 11 }}>Loved it</span>
        {" · "}Solid framework for making good money decisions.
      </p>
      <p style={s.p}>
        <strong style={{ color: "#e8e6e1" }}>Runnin&apos; Down a Dream</strong> — Gurley
        <br />
        <span style={{ color: "#5dcaa5", fontSize: 11 }}>Good reference</span>
        {" · "}The reading list at the end is worth the price alone.
      </p>
      <p style={{ ...s.p, color: "#73716b" }}>
        Recommendations welcome —{" "}
        <a href="mailto:rflores3113@gmail.com" style={{ color: "#5dcaa5" }}>send me one</a>
      </p>
    </>
  );

  return null;
}

// ─── Modal overlay ─────────────────────────────────────────────────────────────
function Modal({ modalId, onClose }: { modalId: string; onClose: () => void }) {
  const titles: Record<string, string> = {
    landing: "Roger Flores",
    projects: "Projects",
    about: "About",
    reading: "Reading",
  };
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(0,0,0,0.75)",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#1a2e1a",
          border: "2px solid #4a7c3f",
          borderRadius: 8,
          padding: "28px 32px",
          maxWidth: 480,
          width: "90%",
          maxHeight: "80vh",
          overflowY: "auto",
          fontFamily: "monospace",
          color: "#a8a69e",
        }}
      >
        <h2 style={{ color: "#9fe1cb", marginBottom: 16, fontSize: 16, fontWeight: 600 }}>
          {titles[modalId]}
        </h2>
        <ModalContent id={modalId} />
        <div style={{ marginTop: 20, borderTop: "1px solid #2d4a1e", paddingTop: 12, fontSize: 11, color: "#4a7c3f", display: "flex", gap: 16 }}>
          <span>[ESC] close</span>
          <a href="/boring" style={{ color: "#4a7c3f" }}>full site →</a>
        </div>
      </div>
    </div>
  );
}

// ─── PlatformerGame ────────────────────────────────────────────────────────────
export function PlatformerGame() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef      = useRef<unknown>(null);
  const [loading,   setLoading]   = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [modal,     setModal]     = useState<string | null>(null);

  // ESC: close modal first, then navigate to /boring
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setModal(prev => {
        if (prev !== null) return null;
        window.location.href = "/boring";
        return null;
      });
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Open modal event from Phaser
  useEffect(() => {
    const onOpen = (e: Event) =>
      setModal((e as CustomEvent<{ modalId: string }>).detail.modalId);
    window.addEventListener("open-modal", onOpen);
    return () => window.removeEventListener("open-modal", onOpen);
  }, []);

  // ── Phaser ────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (gameRef.current) return;
    if (!containerRef.current) return;

    import("phaser").then((Phaser) => {
      if (gameRef.current) return;

      // New PixelLab sprite: individual east-direction PNGs per animation.
      // idle=8 frames, run=6 frames, jump=8 frames.
      const RP_ANIMS = {
        Idle:     { prefix: "rp-idle", count: 8 },
        Movement: { prefix: "rp-run",  count: 6 },
        Jump:     { prefix: "rp-jump", count: 8 },
      } as const;

      // ── Room visual themes + platform layouts ─────────────────────────────────
      // yAbove = pixels above groundY. Max safe jump = 90px (v0²/2g = 600²/4000).
      // Platforms at 72px are directly jumpable from ground.
      // Platforms at 150px require a chain: ground→low platform→high platform.
      type PlatformDef = { xFrac: number; yAbove: number; w: number };
      // Props are bottom-anchored at groundY (yAbove=0) or above it.
      // layer "bg" = behind player (depth 2), "fg" = in front of player (depth 15).
      type PropDef = { key: string; xFrac: number; yAbove: number; scale?: number; flipX?: boolean; layer?: "bg" | "fg" };
      // Vines: vertical climbable strips anchored to groundY, extending topAbove px up.
      type VineDef = { xFrac: number; topAbove: number };
      type RoomTheme = {
        bg: number; ground: number; line: number;
        platformFill: number; platformEdge: number;
        labelColor: string; arrowColor: string;
        platforms: PlatformDef[];
        props: PropDef[];
        vines: VineDef[];
        // Optional fixed spawn point; if omitted uses entry-side default at ground level
        spawnXFrac?: number;
        spawnYAbove?: number;
      };
      const THEMES: RoomTheme[] = [
        { // 0 landing — Japanese bamboo forest / Eastern Himalayas (red panda habitat)
          bg: 0x0a1e10, ground: 0x12280e, line: 0x2a5418,
          platformFill: 0x0d2010, platformEdge: 0x4a8c28,
          labelColor: "#4a8c28", arrowColor: "#4a8c28",
          spawnXFrac: 0.50, spawnYAbove: 40,
          platforms: [
            { xFrac: 0.22, yAbove: 72,  w: 160 }, // left step   — direct jump from ground
            { xFrac: 0.50, yAbove: 145, w: 155 }, // center ledge (above the sign)
            { xFrac: 0.78, yAbove: 72,  w: 160 }, // right step  — direct jump from ground
            { xFrac: 0.35, yAbove: 198, w: 115 }, // high left   — vine-only path
            { xFrac: 0.65, yAbove: 198, w: 115 }, // high right  — vine-only path
          ],
          props: [
            // bg — rhododendron trees, planted into ground (negative yAbove sinks base below groundY)
            { key: "tree-himalaya", xFrac: 0.06, yAbove: -18, scale: 2.2, layer: "bg" },
            { key: "tree-himalaya", xFrac: 0.91, yAbove: -18, scale: 1.8, flipX: true, layer: "bg" },
            // bg — bamboo groves when asset arrives
            { key: "bamboo", xFrac: 0.15, yAbove: -10, scale: 1.3, layer: "bg" },
            { key: "bamboo", xFrac: 0.82, yAbove: -10, scale: 1.1, flipX: true, layer: "bg" },
            { key: "bamboo", xFrac: 0.28, yAbove: -10, scale: 0.9, layer: "bg" },
            // fg — jungle bushes (visual contrast against bg bamboo) + flowers
            { key: "bg-jungle", xFrac: 0.03, yAbove: -4, scale: 1.1, layer: "fg" },
            { key: "bg-jungle", xFrac: 0.72, yAbove: -4, scale: 0.9, flipX: true, layer: "fg" },
            { key: "bg-jungle", xFrac: 0.96, yAbove: -4, scale: 1.0, layer: "fg" },
            { key: "flowers-forest", xFrac: 0.18, yAbove: -6, scale: 1.4, layer: "fg" },
            { key: "flowers-forest", xFrac: 0.58, yAbove: -6, scale: 1.2, flipX: true, layer: "fg" },
            { key: "flowers-forest", xFrac: 0.86, yAbove: -6, scale: 1.1, layer: "fg" },
          ],
          vines: [
            { xFrac: 0.35, topAbove: 225 }, // aligned with high platforms — climb+leap
            { xFrac: 0.65, topAbove: 225 },
          ],
        },
        { // 1 projects — tech cave
          bg: 0x0c1d2c, ground: 0x091828, line: 0x0e6080,
          platformFill: 0x091828, platformEdge: 0x0e8ab0,
          labelColor: "#0ea8d0", arrowColor: "#0e6080",
          platforms: [
            { xFrac: 0.20, yAbove: 72,  w: 160 },
            { xFrac: 0.50, yAbove: 120, w: 160 },
            { xFrac: 0.80, yAbove: 168, w: 160 },
          ],
          props: [
            { key: "terminal-tech", xFrac: 0.10, yAbove: 0, layer: "bg" },
            { key: "terminal-tech", xFrac: 0.88, yAbove: 0, flipX: true, layer: "bg" },
          ],
          vines: [],
        },
        { // 2 about — warm forest clearing
          bg: 0x1f1a0d, ground: 0x2a200a, line: 0x7a6030,
          platformFill: 0x2a200a, platformEdge: 0x9a8040,
          labelColor: "#a08040", arrowColor: "#7a6030",
          platforms: [
            { xFrac: 0.22, yAbove: 150, w: 160 },
            { xFrac: 0.50, yAbove: 72,  w: 160 },
            { xFrac: 0.78, yAbove: 150, w: 160 },
          ],
          props: [
            { key: "tree-forest", xFrac: 0.08, yAbove: 0, scale: 1.4, layer: "bg" },
            { key: "tree-forest", xFrac: 0.92, yAbove: 0, scale: 1.1, flipX: true, layer: "bg" },
          ],
          vines: [],
        },
        { // 3 reading — library
          bg: 0x18101e, ground: 0x1e1428, line: 0x6040a0,
          platformFill: 0x1e1428, platformEdge: 0x8060c0,
          labelColor: "#9070d0", arrowColor: "#6040a0",
          platforms: [
            { xFrac: 0.20, yAbove: 80, w: 160 },
            { xFrac: 0.50, yAbove: 80, w: 160 },
            { xFrac: 0.80, yAbove: 80, w: 160 },
          ],
          props: [
            { key: "bookshelf", xFrac: 0.06, yAbove: 0, scale: 1.2, layer: "bg" },
            { key: "books-reading", xFrac: 0.88, yAbove: 0, layer: "bg" },
            { key: "bookshelf", xFrac: 0.94, yAbove: 0, flipX: true, layer: "bg" },
          ],
          vines: [],
        },
      ];

      // ── BaseScene ─────────────────────────────────────────────────────────────
      class BaseScene extends Phaser.Scene {
        protected buildAnimations() {
          if (this.anims.exists("Idle")) return; // already built by a prior scene
          for (const [key, def] of Object.entries(RP_ANIMS)) {
            this.anims.create({
              key,
              frames: Array.from({ length: def.count }, (_, i) => ({ key: `${def.prefix}-${i}` })),
              frameRate: key === "Idle" ? 8 : 10,
              repeat: key === "Jump" ? 0 : -1,
            });
          }
        }
      }

      // ── RoomScene — all shared room logic ─────────────────────────────────────
      class RoomScene extends BaseScene {
        private player!:  Phaser.Physics.Arcade.Sprite;
        private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
        private wasd!: {
          left:  Phaser.Input.Keyboard.Key;
          right: Phaser.Input.Keyboard.Key;
          up:    Phaser.Input.Keyboard.Key;
          down:  Phaser.Input.Keyboard.Key;
        };
        private jumpKey!:  Phaser.Input.Keyboard.Key;
        private enterKey!: Phaser.Input.Keyboard.Key;
        private shiftKey!: Phaser.Input.Keyboard.Key;

        private signX = 0;
        private signHint!: Phaser.GameObjects.Text;
        private inSignRange = false;
        private transitioning = false;
        private entryFromLeft = true;
        private platforms!: Phaser.Physics.Arcade.StaticGroup;
        private vineZones: Phaser.GameObjects.Rectangle[] = [];
        private onVine = false;
        private activeVineX = 0;
        private mistLayers: Phaser.GameObjects.TileSprite[] = [];

        private readonly SPEED   = 180;
        private readonly JUMP_VY = -600;

        constructor(
          config: Phaser.Types.Scenes.SettingsConfig,
          protected readonly roomIndex: number
        ) {
          super(config);
        }

        init(data: Record<string, unknown>) {
          this.entryFromLeft = (data.fromLeft as boolean) !== false;
          this.transitioning = false;
          this.inSignRange   = false;
          this.mistLayers    = [];
        }

        preload() {
          // Load PixelLab east-direction frames for each animation
          for (const [, def] of Object.entries(RP_ANIMS)) {
            for (let i = 0; i < def.count; i++) {
              const key = `${def.prefix}-${i}`;
              if (!this.textures.exists(key))
                this.load.image(key, `/sprites/rp/${def.prefix.replace("rp-", "")}-${i}.png`);
            }
          }
          // Prop textures — load once, skip if already cached
          const propAssets: [string, string][] = [
            ["tree-himalaya",    "/props/tree-himalaya.png"],
            ["bamboo",           "/props/bamboo.png"],
            ["flowers-forest",   "/props/flowers-forest.png"],
            ["vine-tile",        "/props/vine-tile.png"],
            ["sign-mossy",       "/props/sign-mossy.png"],
            ["grass-tile",           "/props/grass-tile.png"],
            ["grass-dirt-fill",      "/props/grass-dirt-fill.png"],
            ["grass-dirt-fill-r90",  "/props/grass-dirt-fill_r90.png"],
            ["grass-dirt-fill-r180", "/props/grass-dirt-fill_r180.png"],
            ["grass-dirt-fill-r270", "/props/grass-dirt-fill_r270.png"],
            ["stone-dirt-fill",      "/props/stone-dirt-fill.png"],
            ["stone-dirt-fill-r90",  "/props/stone-dirt-fill_r90.png"],
            ["stone-dirt-fill-r180", "/props/stone-dirt-fill_r180.png"],
            ["stone-dirt-fill-r270", "/props/stone-dirt-fill_r270.png"],
            ["bg-jungle",         "/props/bg-jungle.png"],
            ["mist-tile",        "/props/mist-tile.png"],
            ["terminal-tech",    "/props/terminal-tech.png"],
            ["books-reading",    "/props/books-reading.png"],
            ["tree-forest",      "/props/tree-forest.png"],
            ["bookshelf",        "/props/bookshelf.png"],
          ];
          for (const [key, path] of propAssets) {
            if (!this.textures.exists(key)) this.load.image(key, path);
          }
        }

        create() {
          const { width, height } = this.scale;
          const groundY = Math.round(height * 0.72);
          const theme   = THEMES[this.roomIndex];

          // ── Depth constants ───────────────────────────────────────────────────
          // D_SKY=0, D_BGFX=1, D_BGPROP=2, D_GROUND=3, D_PLATFORM=4,
          // D_VINE=5, D_PLAYER=10, D_FGPROP=15, D_SIGN=16, D_UI=20
          const D_SKY = 0, D_BGFX = 1, D_BGPROP = 2, D_GROUND = 3,
                D_PLATFORM = 4, D_VINE = 5, D_PLAYER = 10,
                D_FGPROP = 15, D_SIGN = 16, D_UI = 20;

          // ── Background ────────────────────────────────────────────────────────
          // Sky base
          this.add.rectangle(0, 0, width, height, theme.bg).setOrigin(0, 0).setDepth(D_SKY);

          // Ground — three cross-section layers: grass → dirt → stone
          // Solid backing rects ensure transparent tile PNGs have a base color.
          const totalGroundH = height - groundY;
          const grassH = 32;
          const dirtH  = 64;
          const stoneH = Math.max(32, totalGroundH - grassH - dirtH);
          // Backings
          this.add.rectangle(0, groundY,                   width, grassH, 0x3a7a18).setOrigin(0, 0).setDepth(D_GROUND - 0.1);
          this.add.rectangle(0, groundY + grassH,          width, dirtH,  0x6b3a1a).setOrigin(0, 0).setDepth(D_GROUND - 0.1);
          this.add.rectangle(0, groundY + grassH + dirtH,  width, stoneH, 0x2e2e2e).setOrigin(0, 0).setDepth(D_GROUND - 0.1);
          // Tiles on top of backings — 4 rotations layered at offsets to kill gaps + add variety
          const tileW = 32;
          const addTileLayers = (
            y: number, h: number,
            keys: [string, string, string, string]
          ) => {
            const [k0, k90, k180, k270] = keys;
            if (!this.textures.exists(k0)) return;
            // 0°  starting at x=0
            this.add.tileSprite(0,            y, width,            h, k0  ).setOrigin(0,0).setDepth(D_GROUND);
            // 90° offset by 1/4 tile
            if (this.textures.exists(k90))
              this.add.tileSprite(-tileW*0.25, y, width+tileW*0.25, h, k90 ).setOrigin(0,0).setDepth(D_GROUND).setAlpha(0.6);
            // 180° offset by 1/2 tile
            if (this.textures.exists(k180))
              this.add.tileSprite(-tileW*0.5,  y, width+tileW*0.5,  h, k180).setOrigin(0,0).setDepth(D_GROUND).setAlpha(0.45);
            // 270° offset by 3/4 tile
            if (this.textures.exists(k270))
              this.add.tileSprite(-tileW*0.75, y, width+tileW*0.75, h, k270).setOrigin(0,0).setDepth(D_GROUND).setAlpha(0.3);
          };
          if (this.textures.exists("grass-tile"))
            this.add.tileSprite(0, groundY, width, grassH, "grass-tile").setOrigin(0,0).setDepth(D_GROUND);
          addTileLayers(
            groundY + grassH, dirtH,
            ["grass-dirt-fill","grass-dirt-fill-r90","grass-dirt-fill-r180","grass-dirt-fill-r270"]
          );
          addTileLayers(
            groundY + grassH + dirtH, stoneH,
            ["stone-dirt-fill","stone-dirt-fill-r90","stone-dirt-fill-r180","stone-dirt-fill-r270"]
          );
          // Ground surface line
          this.add.rectangle(0, groundY, width, 2, theme.line).setOrigin(0, 0).setDepth(D_GROUND + 0.1);

          // ── Room-specific atmosphere ───────────────────────────────────────────
          if (this.roomIndex === 0) {
            // ── Bamboo forest atmosphere ──────────────────────────────────────────

            // Deep layered canopy gradient — dark crown → golden-filtered forest floor
            const bgBands: [number, number, number, number][] = [
              [0,             height * 0.12, 0x081208, 0.65],
              [height * 0.08, height * 0.30, 0x0a1e0e, 0.50],
              [height * 0.30, height * 0.28, 0x112a10, 0.35],
              [height * 0.52, height * 0.24, 0x1a3a12, 0.18],
            ];
            for (const [y, h, col, a] of bgBands) {
              this.add.rectangle(0, y, width, h, col).setOrigin(0, 0).setAlpha(a).setDepth(D_BGFX);
            }

            // Distant canopy crown silhouette at very top
            const canopyGfx = this.add.graphics().setDepth(D_BGFX);
            canopyGfx.fillStyle(0x060f07, 0.90);
            const crownX = [0.04, 0.13, 0.24, 0.37, 0.50, 0.62, 0.74, 0.85, 0.94];
            const crownH = [42, 58, 46, 64, 52, 60, 44, 56, 40];
            for (let i = 0; i < crownX.length; i++) {
              canopyGfx.fillEllipse(crownX[i] * width, crownH[i] * 0.5, crownH[i] * 1.9, crownH[i]);
            }

            // Light shafts — 6 warm golden-green beams, angled
            const shaftGfx = this.add.graphics().setDepth(D_BGFX);
            const shafts = [
              { x: width * 0.20, w: 22, angle: -0.05 },
              { x: width * 0.36, w: 42, angle: -0.02 },
              { x: width * 0.52, w: 60, angle:  0.02 },
              { x: width * 0.64, w: 28, angle:  0.04 },
              { x: width * 0.76, w: 18, angle:  0.06 },
              { x: width * 0.88, w: 36, angle:  0.03 },
            ];
            for (const s of shafts) {
              const drift = Math.round(groundY * s.angle);
              shaftGfx.fillStyle(0xa8d060, 0.048);
              shaftGfx.fillTriangle(
                s.x - s.w / 2 + drift, groundY,
                s.x + s.w / 2 + drift, groundY,
                s.x, 0
              );
            }

            // Bamboo silhouettes — bottom-anchored so rotation = natural base-sway
            const bamPos = [0.05, 0.11, 0.18, 0.60, 0.68, 0.76, 0.84, 0.90, 0.96];
            const bamH   = [310, 255, 285, 265, 215, 295, 235, 275, 225];
            const bamW   = [8, 6, 9, 7, 6, 10, 7, 8, 6];
            const bamCol = [0x0b2410, 0x0c2612, 0x091e0d, 0x0b2410, 0x0a2210,
                            0x0c2612, 0x091e0d, 0x0b2410, 0x0a1e0d];
            const bamStalks: Phaser.GameObjects.Rectangle[] = [];
            for (let i = 0; i < bamPos.length; i++) {
              const bx = Math.round(bamPos[i] * width);
              const stalk = this.add.rectangle(bx, groundY, bamW[i], bamH[i], bamCol[i])
                .setOrigin(0.5, 1).setDepth(D_BGFX);
              bamStalks.push(stalk);
              // Leaf burst cap at stalk top
              canopyGfx.fillStyle(0x0e2e14, 0.65);
              canopyGfx.fillEllipse(bx, groundY - bamH[i], bamW[i] * 4.5, bamH[i] * 0.10);
            }
            // Staggered wind sway on each stalk
            bamStalks.forEach((stalk, i) => {
              const swing = 1.0 + (i % 4) * 0.5;
              this.tweens.add({
                targets: stalk,
                angle: swing * (i % 2 === 0 ? 1 : -1),
                duration: 1700 + i * 230,
                ease: "Sine.easeInOut",
                yoyo: true,
                repeat: -1,
                delay: i * 170,
              });
            });

            // Warm ground-level sunlight pool
            this.add.rectangle(0, groundY - 55, width, 65, 0x2a5a14)
              .setOrigin(0, 0).setAlpha(0.16).setDepth(D_BGFX);

            // Ground mist — stored for per-frame scroll in update()
            if (this.textures.exists("mist-tile")) {
              const mistDefs: [number, number, number][] = [
                [groundY - 8,  42, 0.58],
                [groundY - 34, 32, 0.30],
                [groundY - 60, 24, 0.15],
                [groundY - 84, 18, 0.07],
              ];
              for (const [my, mh, ma] of mistDefs) {
                const m = this.add.tileSprite(0, my, width, mh, "mist-tile")
                  .setOrigin(0, 0).setAlpha(ma).setDepth(D_FGPROP + 0.5);
                this.mistLayers.push(m);
              }
            } else {
              const mistBands: [number, number, number][] = [
                [groundY - 10, 30, 0.20],
                [groundY - 34, 22, 0.12],
                [groundY - 58, 16, 0.06],
              ];
              for (const [my, mh, ma] of mistBands) {
                this.add.rectangle(0, my, width, mh, 0xc0e8d0)
                  .setOrigin(0, 0).setAlpha(ma).setDepth(D_BGFX + 0.5);
              }
            }
          }

          // ── Background props (trees, terminals, shelves — behind player) ───────
          for (const prop of theme.props.filter(p => (p.layer ?? "bg") === "bg")) {
            if (!this.textures.exists(prop.key)) continue;
            const img = this.add.image(
              Math.round(prop.xFrac * width),
              groundY - (prop.yAbove ?? 0),
              prop.key
            ).setOrigin(0.5, 1).setScale(prop.scale ?? 1).setDepth(D_BGPROP);
            if (prop.flipX) img.setFlipX(true);
            // Gentle wind sway for jungle room — bamboo sways more, trees less
            if (this.roomIndex === 0) {
              const swing = prop.key === "bamboo" ? 2.2 : 1.3;
              this.tweens.add({
                targets: img,
                angle: swing * (Math.random() > 0.5 ? 1 : -1),
                duration: 1900 + Math.random() * 1100,
                ease: "Sine.easeInOut",
                yoyo: true,
                repeat: -1,
                delay: Math.random() * 900,
              });
            }
          }

          // Room label (top-left breadcrumb)
          const label = this.roomIndex === 0 ? "~/" : `~/${ROOMS[this.roomIndex].key}`;
          this.add.text(14, 10, label, {
            fontFamily: "monospace", fontSize: "11px", color: theme.labelColor,
          }).setAlpha(0.7).setDepth(D_UI);

          // Exit arrows
          if (this.roomIndex < ROOMS.length - 1)
            this.add.text(width - 18, groundY - 20, "›", {
              fontFamily: "monospace", fontSize: "16px", color: theme.arrowColor,
            }).setAlpha(0.5).setDepth(D_UI);
          if (this.roomIndex > 0)
            this.add.text(10, groundY - 20, "‹", {
              fontFamily: "monospace", fontSize: "16px", color: theme.arrowColor,
            }).setAlpha(0.5).setDepth(D_UI);

          // ── Animations ────────────────────────────────────────────────────────
          this.buildAnimations();

          // ── Ground physics ─────────────────────────────────────────────────────
          const groundRect = this.add.rectangle(0, groundY, width, height - groundY)
            .setOrigin(0, 0);
          this.physics.add.existing(groundRect, true);

          // ── Floating platforms ─────────────────────────────────────────────────
          this.platforms = this.physics.add.staticGroup();
          for (const def of theme.platforms) {
            const px = Math.round(def.xFrac * width);
            const py = groundY - def.yAbove;
            const body = this.add.rectangle(px, py, def.w, 16, theme.platformFill).setDepth(D_PLATFORM);
            this.physics.add.existing(body, true);
            this.platforms.add(body);
            this.add.rectangle(px, py - 7, def.w, 2, theme.platformEdge).setDepth(D_PLATFORM);
          }

          // ── Vines ─────────────────────────────────────────────────────────────
          this.vineZones = [];
          this.onVine    = false;
          for (const def of theme.vines) {
            const vx      = Math.round(def.xFrac * width);
            const vtop    = groundY - def.topAbove;
            const vheight = def.topAbove;
            const vmid    = vtop + vheight / 2;
            if (this.textures.exists("vine-tile")) {
              // Sprite-based vine: tileSprite repeats the 32×64 asset vertically
              this.add.tileSprite(vx, vmid, 32, vheight, "vine-tile")
                .setDepth(D_VINE);
            } else {
              // Fallback: brown stem with green leaf nodes
              this.add.rectangle(vx, vmid, 8, vheight, 0x5a3010).setDepth(D_VINE);
              for (let ny = vtop + 10; ny < groundY; ny += 20) {
                this.add.rectangle(vx, ny, 14, 4, 0x3a7a18).setDepth(D_VINE);
              }
            }
            // Invisible grab zone (wider than visual for easy grabbing)
            const zone = this.add.rectangle(vx, vmid, 32, vheight, 0x00ff00, 0);
            this.vineZones.push(zone);
          }

          // ── Sign ──────────────────────────────────────────────────────────────
          this.signX = Math.round(width / 2);
          const signBoardY = groundY - 52;
          if (this.textures.exists("sign-mossy") && this.roomIndex === 0) {
            // Sprite sign: anchor bottom-center at ground, scale x2 for crispness
            this.add.image(this.signX, groundY, "sign-mossy")
              .setOrigin(0.5, 1).setScale(2).setDepth(D_SIGN);
            // "ENT" prompt text overlaid on board area (2× scale sign board ≈ 128×160)
            this.add.text(this.signX, groundY - 96, "ENT", {
              fontFamily: "monospace", fontSize: "13px", color: "#d4c8a0",
            }).setOrigin(0.5).setDepth(D_SIGN);
          } else {
            // Fallback: procedural brown rectangles for rooms without sprite sign
            this.add.rectangle(this.signX, groundY - 18, 5, 34, 0x4a2a0a).setDepth(D_SIGN);
            this.add.rectangle(this.signX, signBoardY, 78, 36, 0x7a4e22)
              .setStrokeStyle(2, 0xb07840).setDepth(D_SIGN);
            this.add.rectangle(this.signX, signBoardY, 70, 28, 0x8f5e2a).setDepth(D_SIGN);
            this.add.text(this.signX, signBoardY, "ENT", {
              fontFamily: "monospace", fontSize: "11px", color: "#d4a06a",
            }).setOrigin(0.5).setDepth(D_SIGN);
          }
          this.signHint = this.add.text(this.signX, signBoardY - 24, "press ENTER", {
            fontFamily: "monospace", fontSize: "9px", color: "#c8905a",
          }).setOrigin(0.5).setAlpha(0).setVisible(false).setDepth(D_UI);

          // ── Player ────────────────────────────────────────────────────────────
          const startX = theme.spawnXFrac !== undefined
            ? Math.round(theme.spawnXFrac * width)
            : (this.entryFromLeft ? 80 : width - 80);
          const startY = groundY - (theme.spawnYAbove ?? 32);
          // 48×48 canvas, character ~28px tall / ~22px wide, rendered at 2×
          this.player = this.physics.add.sprite(startX, startY, "rp-idle-0")
            .setScale(2).setDepth(D_PLAYER);
          (this.player.body as Phaser.Physics.Arcade.Body)
            .setSize(22, 28)
            .setOffset(13, 10);
          if (!this.entryFromLeft) this.player.setFlipX(true);

          // Ground collision (solid)
          this.physics.add.collider(this.player, groundRect);

          // Platform collision — one-way: only land when falling
          this.physics.add.collider(
            this.player,
            this.platforms,
            undefined,
            () => (this.player.body as Phaser.Physics.Arcade.Body).velocity.y >= 0
          );

          // ── Foreground props (flowers etc. — in front of player) ──────────────
          for (const prop of theme.props.filter(p => p.layer === "fg")) {
            if (!this.textures.exists(prop.key)) continue;
            const img = this.add.image(
              Math.round(prop.xFrac * width),
              groundY - (prop.yAbove ?? 0),
              prop.key
            ).setOrigin(0.5, 1).setScale(prop.scale ?? 1).setDepth(D_FGPROP);
            if (prop.flipX) img.setFlipX(true);
            // Flowers sway more than bushes
            if (this.roomIndex === 0) {
              const swing = prop.key === "flowers-forest" ? 2.5 : 1.6;
              this.tweens.add({
                targets: img,
                angle: swing * (Math.random() > 0.5 ? 1 : -1),
                duration: 1600 + Math.random() * 1200,
                ease: "Sine.easeInOut",
                yoyo: true,
                repeat: -1,
                delay: Math.random() * 700,
              });
            }
          }

          this.player.play("Idle");

          // ── Input ─────────────────────────────────────────────────────────────
          this.cursors  = this.input.keyboard!.createCursorKeys();
          this.wasd     = {
            left:  this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            up:    this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down:  this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S),
          };
          this.jumpKey  = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
          this.enterKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
          this.shiftKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

          this.cameras.main.fadeIn(200, 0, 0, 0);
        }

        update() {
          if (this.transitioning) return;

          const body     = this.player.body as Phaser.Physics.Arcade.Body;
          const onGround = body.blocked.down;
          const { width } = this.scale;

          const left  = this.cursors.left.isDown  || this.wasd.left.isDown;
          const right = this.cursors.right.isDown || this.wasd.right.isDown;
          const up    = this.cursors.up.isDown    || this.wasd.up.isDown;
          const down  = this.cursors.down.isDown  || this.wasd.down.isDown;
          const sprint = this.shiftKey.isDown;
          const jumpPressed =
            Phaser.Input.Keyboard.JustDown(this.cursors.up) ||
            Phaser.Input.Keyboard.JustDown(this.wasd.up)    ||
            Phaser.Input.Keyboard.JustDown(this.jumpKey);

          const speed = sprint ? this.SPEED * 1.75 : this.SPEED;

          // ── Vine logic ─────────────────────────────────────────────────────────
          // Detect if player is touching any vine zone
          let touchingVine = false;
          let nearVineX = 0;
          const pb = this.player.getBounds();
          for (const zone of this.vineZones) {
            const zb = zone.getBounds();
            if (Phaser.Geom.Intersects.RectangleToRectangle(pb, zb)) {
              touchingVine = true;
              nearVineX = zone.x;
              break;
            }
          }

          // Grab vine when touching it and pressing up (or already holding)
          if (touchingVine && (up || this.onVine)) {
            this.onVine = true;
          }
          if (!touchingVine) {
            this.onVine = false;
          }

          if (this.onVine) {
            body.allowGravity = false;
            this.player.x = nearVineX; // snap to vine center
            body.setVelocityX(0);
            if (up)        body.setVelocityY(-100);
            else if (down) body.setVelocityY(90);
            else           body.setVelocityY(0);

            // Jump/horizontal = leap off vine
            if (jumpPressed || left || right) {
              this.onVine = false;
              body.allowGravity = true;
              if (jumpPressed) {
                body.setVelocityY(this.JUMP_VY * 0.8);
                body.setVelocityX(this.player.flipX ? -speed : speed);
              }
            }

            // Animation while on vine
            const anim = this.player.anims.currentAnim?.key;
            if (up || down) { if (anim !== "Movement") this.player.play("Movement", true); }
            else            { if (anim !== "Idle")     this.player.play("Idle", true); }
            return; // skip normal movement logic when on vine
          } else {
            body.allowGravity = true;
          }

          // ── Normal movement ────────────────────────────────────────────────────
          if (left)       { body.setVelocityX(-speed); this.player.setFlipX(true); }
          else if (right) { body.setVelocityX(speed);  this.player.setFlipX(false); }
          else            { body.setVelocityX(0); }

          if (jumpPressed && onGround) body.setVelocityY(this.JUMP_VY);

          // Animation state machine
          const anim = this.player.anims.currentAnim?.key;
          if (!onGround) {
            if (anim !== "Jump") this.player.play("Jump", true);
          } else if (left || right) {
            if (anim !== "Movement") this.player.play("Movement", true);
          } else {
            if (anim !== "Idle") this.player.play("Idle", true);
          }

          // Mist drift (jungle room only)
          for (const m of this.mistLayers) m.tilePositionX -= 0.18;

          // Sign proximity
          const dist = Math.abs(this.player.x - this.signX);
          const near = dist < 64;
          if (near !== this.inSignRange) {
            this.inSignRange = near;
            this.signHint.setVisible(near);
            this.tweens.add({
              targets: this.signHint,
              alpha: near ? 1 : 0,
              duration: 150,
            });
          }
          if (near && Phaser.Input.Keyboard.JustDown(this.enterKey)) {
            window.dispatchEvent(new CustomEvent("open-modal", {
              detail: { modalId: ROOMS[this.roomIndex].modalId },
            }));
          }

          // Room exits
          const half  = this.player.displayWidth / 2;
          if (this.player.x < -half + 4 && this.roomIndex > 0) {
            this.startTransition(this.roomIndex - 1, false);
          } else if (this.player.x > width + half - 4 && this.roomIndex < ROOMS.length - 1) {
            this.startTransition(this.roomIndex + 1, true);
          }

          // Clamp at world edges (first and last room)
          if (this.roomIndex === 0)
            this.player.x = Math.max(this.player.x, half + 2);
          if (this.roomIndex === ROOMS.length - 1)
            this.player.x = Math.min(this.player.x, width - half - 2);
        }

        private startTransition(nextIndex: number, playerEnteredFromLeft: boolean) {
          this.transitioning = true;
          this.cameras.main.fadeOut(180, 0, 0, 0);
          this.cameras.main.once(
            Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
            () => this.scene.start(ROOMS[nextIndex].key, { fromLeft: playerEnteredFromLeft })
          );
        }
      }

      // ── 4 room scenes ─────────────────────────────────────────────────────────
      class LandingScene  extends RoomScene { constructor() { super({ key: "landing"  }, 0); } }
      class ProjectsScene extends RoomScene { constructor() { super({ key: "projects" }, 1); } }
      class AboutScene    extends RoomScene { constructor() { super({ key: "about"    }, 2); } }
      class ReadingScene  extends RoomScene { constructor() { super({ key: "reading"  }, 3); } }

      const game = new Phaser.Game({
        type: Phaser.AUTO,
        parent: containerRef.current!,
        backgroundColor: "#1a2e1a",
        pixelArt: true,
        scale: {
          mode: Phaser.Scale.RESIZE,
          autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        physics: {
          default: "arcade",
          arcade: { gravity: { x: 0, y: 2000 }, debug: false },
        },
        scene: [LandingScene, ProjectsScene, AboutScene, ReadingScene],
      });

      gameRef.current = game;
      game.events.once("ready", () => setLoading(false));
    }).catch((err) => {
      console.error("Phaser failed to load:", err);
      setLoadError(true);
      setLoading(false);
    });

    return () => {
      if (gameRef.current) {
        (gameRef.current as { destroy: (r: boolean) => void }).destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      {loading && !loadError && <GameLoader />}
      {loadError && <GameLoader error />}
      {modal && <Modal modalId={modal} onClose={() => setModal(null)} />}
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "100%",
          opacity: loading ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
      />
    </div>
  );
}
