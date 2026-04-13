"use client";

import { useEffect, useRef, useState } from "react";
import { GameLoader } from "./GameLoader";

// ─── Room config (order = left-to-right in the world) ─────────────────────────
const ROOMS = [
  { key: "landing" },
  { key: "socials" },  // social links room — no modal, opens URLs
] as const;

// Animation dirs on disk (hardcoded to avoid metadata.json key mismatch)
const ANIM_DIRS = {
  idle:  "Idle-8d50bd6c",
  run:   "Slow_Run-0fccd43f",
  jump:  "Jump-076269b5",
  climb: "Walk-98912dec",
} as const;
function padN(n: number) { return String(n).padStart(3, "0"); }

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
    landing:  "Roger Flores",
    projects: "Projects",
    about:    "About",
    reading:  "Reading",
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
          fontFamily: "Nunito, Arial Rounded MT Bold, Trebuchet MS, sans-serif",
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

  // Open social link (Phaser can't call window.open directly — popup blockers)
  useEffect(() => {
    const onSocial = (e: Event) => {
      const { url } = (e as CustomEvent<{ url: string }>).detail;
      window.open(url, "_blank", "noopener,noreferrer");
    };
    window.addEventListener("open-social", onSocial);
    return () => window.removeEventListener("open-social", onSocial);
  }, []);

  // ── Phaser ────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (gameRef.current) return;
    if (!containerRef.current) return;

    import("phaser").then((Phaser) => {
      if (gameRef.current) return;

      // ── Room visual themes + platform layouts ─────────────────────────────────
      type PlatformDef = { xFrac: number; yAbove: number; w: number };
      type PropDef = { key: string; xFrac: number; yAbove: number; scale?: number; flipX?: boolean; layer?: "bg" | "fg" };
      type SignDef   = { xFrac: number; modalId: string };
      type SocialDef = { xFrac: number; url: string; label: string };
      type RoomTheme = {
        bg: number; ground: number; line: number;
        platformFill: number; platformEdge: number;
        labelColor: string; arrowColor: string;
        platforms: PlatformDef[];
        props: PropDef[];
        signs: SignDef[];
        socials?: SocialDef[];
        spawnXFrac?: number;
        spawnYAbove?: number;
      };

      const THEMES: RoomTheme[] = [
        { // 0 landing — bamboo forest / red panda habitat
          bg: 0x0a1e10, ground: 0x12280e, line: 0x2a5418,
          platformFill: 0x0d2010, platformEdge: 0x4a8c28,
          labelColor: "#4a8c28", arrowColor: "#4a8c28",
          spawnXFrac: 0.08, spawnYAbove: 40,
          platforms: [
            // Lower tier — direct jump from ground (~72px)
            { xFrac: 0.15, yAbove: 72,  w: 130 },
            { xFrac: 0.38, yAbove: 72,  w: 110 },
            { xFrac: 0.62, yAbove: 72,  w: 110 },
            { xFrac: 0.85, yAbove: 72,  w: 130 },
            // Middle tier — hop from lower (~145px)
            { xFrac: 0.28, yAbove: 145, w: 120 },
            { xFrac: 0.72, yAbove: 145, w: 120 },
            // Upper tier — vine-assisted (~210px)
            { xFrac: 0.50, yAbove: 210, w: 140 },
            // Top platform (~275px)
            { xFrac: 0.50, yAbove: 275, w: 100 },
          ],
          props: [
            // bg — rhododendron trees
            { key: "tree-himalaya", xFrac: 0.06, yAbove: -18, scale: 2.2, layer: "bg" },
            { key: "tree-himalaya", xFrac: 0.91, yAbove: -18, scale: 1.8, flipX: true, layer: "bg" },
            // bg — bamboo groves
            { key: "bamboo", xFrac: 0.15, yAbove: -10, scale: 1.3, layer: "bg" },
            { key: "bamboo", xFrac: 0.82, yAbove: -10, scale: 1.1, flipX: true, layer: "bg" },
            { key: "bamboo", xFrac: 0.28, yAbove: -10, scale: 0.9, layer: "bg" },
            // fg — flowers
            { key: "flowers-forest", xFrac: 0.18, yAbove: -6, scale: 1.4, layer: "fg" },
            { key: "flowers-forest", xFrac: 0.58, yAbove: -6, scale: 1.2, flipX: true, layer: "fg" },
            { key: "flowers-forest", xFrac: 0.86, yAbove: -6, scale: 1.1, layer: "fg" },
            // fg — fern clusters (odd groupings, varying scale)
            { key: "fern-cluster", xFrac: 0.10, yAbove: -12, scale: 1.1, layer: "fg" },
            { key: "fern-cluster", xFrac: 0.48, yAbove: -10, scale: 0.85, flipX: true, layer: "fg" },
            { key: "fern-cluster", xFrac: 0.88, yAbove: -13, scale: 1.3, layer: "fg" },
            // fg — mushroom clusters near tree bases
            { key: "mushrooms", xFrac: 0.32, yAbove: -15, scale: 0.9, layer: "fg" },
            { key: "mushrooms", xFrac: 0.70, yAbove: -13, scale: 0.75, flipX: true, layer: "fg" },
            // bg — mossy rocks scattered across ground
            { key: "mossy-rocks", xFrac: 0.55, yAbove: -12, scale: 1.0, layer: "bg" },
            { key: "mossy-rocks", xFrac: 0.90, yAbove: -10, scale: 0.8, flipX: true, layer: "bg" },
            // bg — hollow fallen log
            { key: "log-hollow", xFrac: 0.50, yAbove: -27, scale: 1.4, layer: "bg" },
          ],
          signs: [
            { xFrac: 0.22, modalId: "landing"  },
            { xFrac: 0.41, modalId: "projects" },
            { xFrac: 0.59, modalId: "about"    },
            { xFrac: 0.78, modalId: "reading"  },
          ],
        },
        { // 1 socials — stone temple, warm torchlight
          bg: 0x1a0e06, ground: 0x2d1e0a, line: 0x7a4010,
          platformFill: 0x2d1e0a, platformEdge: 0x9a5020,
          labelColor: "#c8a060", arrowColor: "#7a4010",
          spawnXFrac: 0.12, spawnYAbove: 20,
          platforms: [
            { xFrac: 0.25, yAbove: 90, w: 120 }, // pedestal left  (linkedin)
            { xFrac: 0.50, yAbove: 90, w: 120 }, // pedestal center (github)
            { xFrac: 0.75, yAbove: 90, w: 120 }, // pedestal right (email)
            { xFrac: 0.12, yAbove: 50, w: 80 },  // step left
            { xFrac: 0.88, yAbove: 50, w: 80 },  // step right
          ],
          props: [],
          signs: [],
          socials: [
            { xFrac: 0.25, url: "https://www.linkedin.com/in/roger-flores-3113-nu/", label: "LinkedIn" },
            { xFrac: 0.50, url: "https://github.com/RogerFlores3113",               label: "GitHub"   },
            { xFrac: 0.75, url: "mailto:rflores3113@gmail.com",                     label: "Email"    },
          ],
        },
      ];

      // ── BaseScene ─────────────────────────────────────────────────────────────
      class BaseScene extends Phaser.Scene {
        protected buildAnimations() {
          if (this.anims.exists("Idle")) return; // already built by a prior scene
          this.anims.create({
            key: "Idle",
            frames: Array.from({ length: 8 }, (_, i) => ({ key: `rp2-idle-east-${i}` })),
            frameRate: 8,
            repeat: -1,
          });
          this.anims.create({
            key: "Run",
            frames: Array.from({ length: 8 }, (_, i) => ({ key: `rp2-run-east-${i}` })),
            frameRate: 10,
            repeat: -1,
          });
          this.anims.create({
            key: "Jump",
            frames: Array.from({ length: 8 }, (_, i) => ({ key: `rp2-jump-east-${i}` })),
            frameRate: 10,
            repeat: 0,
          });
          this.anims.create({
            key: "Walk",
            frames: Array.from({ length: 4 }, (_, i) => ({ key: `rp2-walk-east-${i}` })),
            frameRate: 8,
            repeat: -1,
          });
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

        // Signs (modals)
        private signDefs:  Array<{ x: number; modalId: string }> = [];
        private signHints: Phaser.GameObjects.Text[] = [];
        private activeSignIdx = -1;
        // Social statues (room 2)
        private socialLinks: Array<{ x: number; url: string }> = [];
        private socialHints: Phaser.GameObjects.Text[] = [];
        private activeSocial = -1;
        // State
        private transitioning = false;
        private entryFromLeft = true;
        private platforms!: Phaser.Physics.Arcade.StaticGroup;
        // Mist (chunky individual sprites)
        private mistSprites: Array<{ img: Phaser.GameObjects.Image; vx: number }> = [];

        private readonly SPEED   = 180;
        private readonly JUMP_VY = -600;

        constructor(
          config: Phaser.Types.Scenes.SettingsConfig,
          protected readonly roomIndex: number
        ) {
          super(config);
        }

        init(data: Record<string, unknown>) {
          this.entryFromLeft  = (data.fromLeft as boolean) !== false;
          this.transitioning  = false;
          this.signDefs       = [];
          this.signHints      = [];
          this.activeSignIdx  = -1;
          this.socialLinks    = [];
          this.socialHints    = [];
          this.activeSocial   = -1;
          this.mistSprites    = [];
        }

        preload() {
          // ── New PixelLab sprites ─────────────────────────────────────────────
          // east frames: idle, run, jump (8 each)
          const RP_BASE = "/sprites/pixellab_red_panda/animations";
          for (let i = 0; i < 8; i++) {
            const f = padN(i);
            if (!this.textures.exists(`rp2-idle-east-${i}`))
              this.load.image(`rp2-idle-east-${i}`, `${RP_BASE}/${ANIM_DIRS.idle}/east/frame_${f}.png`);
            if (!this.textures.exists(`rp2-run-east-${i}`))
              this.load.image(`rp2-run-east-${i}`,  `${RP_BASE}/${ANIM_DIRS.run}/east/frame_${f}.png`);
            if (!this.textures.exists(`rp2-jump-east-${i}`))
              this.load.image(`rp2-jump-east-${i}`, `${RP_BASE}/${ANIM_DIRS.jump}/east/frame_${f}.png`);
          }
          // east frames: walk (4)
          for (let i = 0; i < 4; i++) {
            if (!this.textures.exists(`rp2-walk-east-${i}`))
              this.load.image(`rp2-walk-east-${i}`, `${RP_BASE}/${ANIM_DIRS.climb}/east/frame_${padN(i)}.png`);
          }
          // north frames: climb (4)
          for (let i = 0; i < 4; i++) {
            if (!this.textures.exists(`rp2-climb-north-${i}`))
              this.load.image(`rp2-climb-north-${i}`, `${RP_BASE}/${ANIM_DIRS.climb}/north/frame_${padN(i)}.png`);
          }

          // ── Room 0 background ────────────────────────────────────────────────
          if (!this.textures.exists("bg-forest"))
            this.load.image("bg-forest", "/sprites/forest-background.jpg");

          // ── Prop textures — load once, skip if already cached ────────────────
          const propAssets: [string, string][] = [
            ["tree-himalaya",    "/props/tree-himalaya.png"],
            ["bamboo",           "/props/bamboo.png"],
            ["flowers-forest",   "/props/flowers-forest.png"],
            ["sign-mossy",       "/props/sign-mossy.png"],
            ["sign-jungle",      "/props/sign-jungle.png"],
            ["sign-bamboo",      "/props/sign-bamboo.png"],
            ["sign-lantern",     "/props/sign-lantern.png"],
            ["fern-cluster",     "/props/fern-cluster.png"],
            ["mushrooms",        "/props/mushrooms.png"],
            ["mossy-rocks",      "/props/mossy-rocks.png"],
            ["log-hollow",       "/props/log-hollow.png"],
            ["statue-linkedin",  "/props/statue-linkedin.png"],
            ["statue-github",    "/props/statue-github.png"],
            ["statue-email",     "/props/statue-email.png"],
            ["grass-tile",           "/props/grass-tile.png"],
            ["platform-wood",        "/props/platform-wood.png"],
            ["grass-dirt-fill",      "/props/grass-dirt-fill.png"],
            ["grass-dirt-fill-r90",  "/props/grass-dirt-fill_r90.png"],
            ["grass-dirt-fill-r180", "/props/grass-dirt-fill_r180.png"],
            ["grass-dirt-fill-r270", "/props/grass-dirt-fill_r270.png"],
            ["stone-dirt-fill",      "/props/stone-dirt-fill.png"],
            ["stone-dirt-fill-r90",  "/props/stone-dirt-fill_r90.png"],
            ["stone-dirt-fill-r180", "/props/stone-dirt-fill_r180.png"],
            ["stone-dirt-fill-r270", "/props/stone-dirt-fill_r270.png"],
            ["mist-tile",        "/props/mist-tile.png"],
            ["mist-cloud-a",     "/props/mist-cloud-a.png"],
            ["mist-cloud-b",     "/props/mist-cloud-b.png"],
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
          // D_PLAYER=10, D_FGPROP=15, D_SIGN=16, D_UI=20, D_MIST=50
          const D_SKY = 0, D_BGFX = 1, D_BGPROP = 2, D_GROUND = 3,
                D_PLATFORM = 4, D_PLAYER = 10,
                D_FGPROP = 15, D_SIGN = 16, D_UI = 20, D_MIST = 50;

          // ── Background ────────────────────────────────────────────────────────
          if (this.roomIndex === 0 && this.textures.exists("bg-forest")) {
            // Forest background image fills the full canvas
            this.add.image(width / 2, height / 2, "bg-forest")
              .setDisplaySize(width, height)
              .setAlpha(0.85)
              .setDepth(D_SKY);
          } else {
            this.add.rectangle(0, 0, width, height, theme.bg).setOrigin(0, 0).setDepth(D_SKY);
          }

          // Ground — three cross-section layers: grass → dirt → stone
          // Solid backing rects ensure transparent tile PNGs have a base color.
          const totalGroundH = height - groundY;
          const grassH = 32;
          const dirtH  = 64;
          const stoneH = Math.max(32, totalGroundH - grassH - dirtH);
          // Backings — skip grass backing for room 0 (forest bg shows through fine)
          const hasBgImage = this.roomIndex === 0 && this.textures.exists("bg-forest");
          if (!hasBgImage)
            this.add.rectangle(0, groundY, width, grassH, 0x3a7a18).setOrigin(0, 0).setDepth(D_GROUND - 0.1);
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

            // Bamboo leaf cap graphics (reused per stalk below)
            const canopyGfx = this.add.graphics().setDepth(D_BGFX);

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
            fontFamily: "Nunito, Arial Rounded MT Bold, Trebuchet MS, sans-serif", fontSize: "14px", color: theme.labelColor,
          }).setAlpha(0.7).setDepth(D_UI);

          // Exit arrows
          if (this.roomIndex < ROOMS.length - 1)
            this.add.text(width - 18, groundY - 20, "›", {
              fontFamily: "Nunito, Arial Rounded MT Bold, Trebuchet MS, sans-serif", fontSize: "20px", color: theme.arrowColor,
            }).setAlpha(0.5).setDepth(D_UI);
          if (this.roomIndex > 0)
            this.add.text(10, groundY - 20, "‹", {
              fontFamily: "Nunito, Arial Rounded MT Bold, Trebuchet MS, sans-serif", fontSize: "20px", color: theme.arrowColor,
            }).setAlpha(0.5).setDepth(D_UI);

          // ── Animations ────────────────────────────────────────────────────────
          this.buildAnimations();

          // ── Ground physics ─────────────────────────────────────────────────────
          const groundRect = this.add.rectangle(0, groundY, width, height - groundY)
            .setOrigin(0, 0);
          this.physics.add.existing(groundRect, true);

          // ── Floating platforms ─────────────────────────────────────────────────
          this.platforms = this.physics.add.staticGroup();
          const PLAT_H = 28; // taller = easier to see and land on
          const useWoodTile = this.textures.exists("platform-wood");
          for (const def of theme.platforms) {
            const px = Math.round(def.xFrac * width);
            const py = groundY - def.yAbove;
            // Invisible physics body
            const body = this.add.rectangle(px, py, def.w, PLAT_H, theme.platformFill, useWoodTile ? 0 : 1)
              .setDepth(D_PLATFORM);
            this.physics.add.existing(body, true);
            this.platforms.add(body);
            if (useWoodTile) {
              // Wood tile tileSprite — setTileScale(0.5, 0.875) makes tiles denser horizontally
              const ts = this.add.tileSprite(px - def.w / 2, py - PLAT_H / 2, def.w, PLAT_H, "platform-wood")
                .setOrigin(0, 0.5).setDepth(D_PLATFORM);
              ts.setTileScale(0.5, PLAT_H / 32); // 0.5x width = denser, fit height exactly
            } else {
              this.add.rectangle(px, py - PLAT_H / 2 + 1, def.w, 2, theme.platformEdge).setDepth(D_PLATFORM);
            }
          }

          // ── Rope stripe — tan horizontal bar inside each platform, behind wood ──
          {
            const ropeGfx = this.add.graphics().setDepth(D_PLATFORM - 0.5);
            ropeGfx.fillStyle(0xc8a060, 0.85);
            for (const def of theme.platforms) {
              const px = Math.round(def.xFrac * width);
              const py = groundY - def.yAbove;
              ropeGfx.fillRect(px - def.w / 2, py - 2, def.w, 3);
            }
          }

          // ── Signs (modal triggers) ────────────────────────────────────────────
          // Rotate through available sign variants for variety
          const SIGN_KEYS  = ["sign-jungle", "sign-bamboo", "sign-lantern", "sign-mossy"];
          const SIGN_NAMES: Record<string, string> = {
            landing: "About Me", projects: "Projects", about: "Now", reading: "Reading",
          };
          // Only include keys that are actually loaded
          const availableSignKeys = SIGN_KEYS.filter(k => this.textures.exists(k));
          // Transparent bottom padding per sign (px at scale 1); used to sink image so it sits flush
          const SIGN_SINK: Record<string, number> = {
            "sign-jungle":  6,   // 3px transparent * scale 2
            "sign-bamboo":  16,  // 8px transparent * scale 2
            "sign-lantern": 12,  // 6px transparent * scale 2
            "sign-mossy":   8,   // 4px transparent * scale 2
          };
          this.signDefs  = [];
          this.signHints = [];
          for (let si = 0; si < theme.signs.length; si++) {
            const sd = theme.signs[si];
            const sx = Math.round(sd.xFrac * width);
            this.signDefs.push({ x: sx, modalId: sd.modalId });
            // Cycle through all available sign keys
            const usedKey = availableSignKeys.length > 0
              ? availableSignKeys[si % availableSignKeys.length]
              : null;
            const sink    = usedKey ? (SIGN_SINK[usedKey] ?? 6) : 0;
            const boardY  = groundY - 52;
            if (usedKey) {
              this.add.image(sx, groundY + sink, usedKey)
                .setOrigin(0.5, 1).setScale(2).setDepth(D_SIGN);
              // Label on board
              const label = SIGN_NAMES[sd.modalId] ?? "ENT";
              this.add.text(sx, groundY - 88, label, {
                fontFamily: "Nunito, Arial Rounded MT Bold, Trebuchet MS, sans-serif", fontSize: "13px", color: "#d4c8a0",
              }).setOrigin(0.5).setDepth(D_SIGN + 0.1);
            } else {
              this.add.rectangle(sx, groundY - 18, 5, 34, 0x4a2a0a).setDepth(D_SIGN);
              this.add.rectangle(sx, boardY, 90, 36, 0x7a4e22)
                .setStrokeStyle(2, 0xb07840).setDepth(D_SIGN);
              this.add.rectangle(sx, boardY, 82, 28, 0x8f5e2a).setDepth(D_SIGN);
              this.add.text(sx, boardY, SIGN_NAMES[sd.modalId] ?? "ENT", {
                fontFamily: "Nunito, Arial Rounded MT Bold, Trebuchet MS, sans-serif", fontSize: "13px", color: "#d4a06a",
              }).setOrigin(0.5).setDepth(D_SIGN);
            }
            const hint = this.add.text(sx, boardY - 24, "[ ENTER ]", {
              fontFamily: "Nunito, Arial Rounded MT Bold, Trebuchet MS, sans-serif", fontSize: "12px", color: "#c8905a",
            }).setOrigin(0.5).setAlpha(0).setDepth(D_UI);
            this.signHints.push(hint);
          }

          // ── Social statues (room 1) ───────────────────────────────────────────
          this.socialLinks  = [];
          this.socialHints  = [];
          if (theme.socials) {
            for (const soc of theme.socials) {
              const sx = Math.round(soc.xFrac * width);
              this.socialLinks.push({ x: sx, url: soc.url });
              // Statue image or placeholder pillar
              const statueKeyMap: Record<string, string> = {
                "LinkedIn": "statue-linkedin",
                "GitHub":   "statue-github",
                "Email":    "statue-email",
              };
              const statueKey = statueKeyMap[soc.label];
              if (statueKey && this.textures.exists(statueKey)) {
                this.add.image(sx, groundY, statueKey)
                  .setOrigin(0.5, 1).setScale(2).setDepth(D_FGPROP);
              } else {
                this.add.rectangle(sx, groundY, 28, 80, 0x5a3c1e)
                  .setOrigin(0.5, 1).setDepth(D_FGPROP);
                this.add.rectangle(sx, groundY - 80, 40, 14, 0x8a6030)
                  .setOrigin(0.5, 1).setDepth(D_FGPROP);
              }
              // Warm flicker glow behind each torch
              const glow = this.add.circle(sx, groundY - 100, 16, 0xff8820, 0.25)
                .setDepth(D_BGFX);
              this.tweens.add({
                targets: glow,
                alpha: { from: 0.18, to: 0.35 },
                scaleX: { from: 0.9, to: 1.1 },
                scaleY: { from: 0.9, to: 1.1 },
                duration: 600 + Math.random() * 400,
                ease: "Sine.easeInOut",
                yoyo: true,
                repeat: -1,
              });
              // Label
              this.add.text(sx, groundY - 100, soc.label, {
                fontFamily: "Nunito, Arial Rounded MT Bold, Trebuchet MS, sans-serif", fontSize: "12px", color: "#c8a060",
              }).setOrigin(0.5).setDepth(D_SIGN);
              // Proximity hint (initially hidden)
              const hint = this.add.text(sx, groundY - 115, "[ ENTER ]", {
                fontFamily: "Nunito, Arial Rounded MT Bold, Trebuchet MS, sans-serif", fontSize: "12px", color: "#ffa040",
              }).setOrigin(0.5).setAlpha(0).setDepth(D_UI);
              this.socialHints.push(hint);
            }
          }

          // ── Stone temple atmosphere (room 1) ──────────────────────────────────
          if (this.roomIndex === 1) {
            // Warm vignette bands at top
            const tempBands: [number, number, number, number][] = [
              [0,            height * 0.15, 0x0f0602, 0.70],
              [height * 0.1, height * 0.35, 0x1a0d05, 0.50],
              [height * 0.4, height * 0.30, 0x2a1a08, 0.25],
            ];
            for (const [y, h, col, a] of tempBands) {
              this.add.rectangle(0, y, width, h, col).setOrigin(0, 0).setAlpha(a).setDepth(D_BGFX);
            }
            // Stone column silhouettes
            const colX = [0.05, 0.15, 0.85, 0.95];
            for (const cx of colX) {
              this.add.rectangle(Math.round(cx * width), groundY, 18, height * 0.6, 0x2e1e0a)
                .setOrigin(0.5, 1).setAlpha(0.7).setDepth(D_BGFX);
            }
          }

          // ── Chunky mist sprites (room 0) ─────────────────────────────────────
          this.mistSprites = [];
          if (this.roomIndex === 0) {
            // Pool of mist texture keys — use whichever are loaded
            const mistKeys = ["mist-tile", "mist-cloud-a", "mist-cloud-b"]
              .filter(k => this.textures.exists(k));
            if (mistKeys.length > 0) {
              const mistCount = 45 + Math.floor(Math.random() * 10); // 45-54
              for (let m = 0; m < mistCount; m++) {
                const key   = mistKeys[m % mistKeys.length];
                const mx    = Math.random() * width;
                // Spread across top 40% of scene as clouds
                const my    = height * 0.04 + Math.random() * height * 0.36;
                const scale = 1.0 + Math.random() * 2.2;
                const alpha = 0.12 + Math.random() * 0.22;
                const angle = Math.random() * 20 - 10; // gentle tilt
                const img   = this.add.image(mx, my, key)
                  .setScale(scale)
                  .setAlpha(alpha)
                  .setAngle(angle)
                  .setDepth(D_MIST);
                const vx = (22 + Math.random() * 28) * (Math.random() > 0.5 ? 1 : -1);
                this.mistSprites.push({ img, vx });
              }
            }
          }

          // ── Player ────────────────────────────────────────────────────────────
          const startX = theme.spawnXFrac !== undefined
            ? Math.round(theme.spawnXFrac * width)
            : (this.entryFromLeft ? 80 : width - 80);
          const startY = groundY - (theme.spawnYAbove ?? 32);
          this.player = this.physics.add.sprite(startX, startY, "rp2-idle-east-0")
            .setScale(1.5).setDepth(D_PLAYER);
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
            if (sprint) { if (anim !== "Run")  this.player.play("Run",  true); }
            else        { if (anim !== "Walk") this.player.play("Walk", true); }
          } else {
            if (anim !== "Idle") this.player.play("Idle", true);
          }

          // Mist drift (chunky individual images)
          const dt = this.game.loop.delta / 1000;
          for (const ms of this.mistSprites) {
            ms.img.x += ms.vx * dt;
            if (ms.vx > 0 && ms.img.x > width + 100) ms.img.x = -100;
            if (ms.vx < 0 && ms.img.x < -100)        ms.img.x = width + 100;
          }

          // ── Sign proximity (modal triggers) ────────────────────────────────────
          let nearSignIdx = -1;
          for (let i = 0; i < this.signDefs.length; i++) {
            if (Math.abs(this.player.x - this.signDefs[i].x) < 64) {
              nearSignIdx = i;
              break;
            }
          }
          if (nearSignIdx !== this.activeSignIdx) {
            if (this.activeSignIdx >= 0)
              this.tweens.add({ targets: this.signHints[this.activeSignIdx], alpha: 0, duration: 150 });
            if (nearSignIdx >= 0)
              this.tweens.add({ targets: this.signHints[nearSignIdx], alpha: 1, duration: 150 });
            this.activeSignIdx = nearSignIdx;
          }
          if (nearSignIdx >= 0 && Phaser.Input.Keyboard.JustDown(this.enterKey)) {
            window.dispatchEvent(new CustomEvent("open-modal", {
              detail: { modalId: this.signDefs[nearSignIdx].modalId },
            }));
          }

          // ── Social proximity (link triggers) ───────────────────────────────────
          let nearSocialIdx = -1;
          for (let i = 0; i < this.socialLinks.length; i++) {
            if (Math.abs(this.player.x - this.socialLinks[i].x) < 64) {
              nearSocialIdx = i;
              break;
            }
          }
          if (nearSocialIdx !== this.activeSocial) {
            if (this.activeSocial >= 0)
              this.tweens.add({ targets: this.socialHints[this.activeSocial], alpha: 0, duration: 150 });
            if (nearSocialIdx >= 0)
              this.tweens.add({ targets: this.socialHints[nearSocialIdx], alpha: 1, duration: 150 });
            this.activeSocial = nearSocialIdx;
          }
          if (nearSocialIdx >= 0 && Phaser.Input.Keyboard.JustDown(this.enterKey)) {
            window.dispatchEvent(new CustomEvent("open-social", {
              detail: { url: this.socialLinks[nearSocialIdx].url },
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

      // ── 2 room scenes ─────────────────────────────────────────────────────────
      class LandingScene  extends RoomScene { constructor() { super({ key: "landing" }, 0); } }
      class SocialsScene  extends RoomScene { constructor() { super({ key: "socials" }, 1); } }

      const game = new Phaser.Game({
        type: Phaser.AUTO,
        parent: containerRef.current!,
        backgroundColor: "#0a1e10",
        pixelArt: true,
        scale: {
          mode: Phaser.Scale.RESIZE,
          autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        physics: {
          default: "arcade",
          arcade: { gravity: { x: 0, y: 2000 }, debug: false },
        },
        scene: [LandingScene, SocialsScene],
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
