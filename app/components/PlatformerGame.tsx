"use client";

import { useEffect, useRef, useState } from "react";
import { GameLoader } from "./GameLoader";

// ─── Room config (order = left-to-right in the world) ─────────────────────────
const ROOMS = [
  { key: "landing" },
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
  const s = { p: { marginBottom: 12, fontSize: "clamp(14px, 1.3vw, 17px)", lineHeight: 1.75 } as React.CSSProperties };

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
        Currently building{" "}
        <a href="https://podium-beta.vercel.app/" target="_blank" style={{ color: "#5dcaa5" }}>Podium</a>
        {" "}— a live RAG assistant.
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
        <strong style={{ color: "#e8e6e1" }}>Podium</strong>{" "}
        <a href="https://podium-beta.vercel.app/" target="_blank" style={{ color: "#5dcaa5", fontSize: 12 }}>↗ live beta</a>
        <br />
        RAG assistant with BYOK architecture, agentic tools, Terraform IaC on AWS.
        <br />
        <span style={{ color: "#5dcaa5", fontSize: 11 }}>Next.js · TypeScript · AWS · Terraform · RAG</span>
      </p>
      <p style={s.p}>
        <strong style={{ color: "#e8e6e1" }}>Law Firm Lead Scraper</strong> — 3-day build.
        URL in → structured Excel out. Python + Selenium.
      </p>
      <p style={s.p}>
        <strong style={{ color: "#e8e6e1" }}>Minecraft Escape Room</strong> — ~4hrs of gameplay,
        second room in progress.
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
        {" "}— RAG assistant, BYOK architecture, agentic tools, Terraform IaC on AWS.
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
          borderRadius: 10,
          padding: "clamp(22px, 3vw, 40px) clamp(24px, 3.5vw, 44px)",
          width: "clamp(320px, 55vw, 680px)",
          maxHeight: "85vh",
          overflowY: "auto",
          fontFamily: "Nunito, Arial Rounded MT Bold, Trebuchet MS, sans-serif",
          color: "#a8a69e",
        }}
      >
        <h2 style={{ color: "#9fe1cb", marginBottom: 18, fontSize: "clamp(18px, 1.8vw, 24px)", fontWeight: 600 }}>
          {titles[modalId]}
        </h2>
        <ModalContent id={modalId} />
        <div style={{ marginTop: 22, borderTop: "1px solid #2d4a1e", paddingTop: 14, fontSize: "clamp(12px, 1vw, 14px)", color: "#4a7c3f", display: "flex", gap: 16 }}>
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

  // ESC: Phaser fires "game-esc"; close modal if open, else go to /boring
  useEffect(() => {
    const onEsc = () => {
      setModal(prev => {
        if (prev !== null) return null;
        window.location.href = "/boring";
        return null;
      });
    };
    window.addEventListener("game-esc", onEsc);
    return () => window.removeEventListener("game-esc", onEsc);
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
          spawnXFrac: 0.50, spawnYAbove: 230,
          platforms: [
            // Lower tier — outer two flank the signs, inner two raised above signs
            { xFrac: 0.15, yAbove: 72,  w: 130 },
            { xFrac: 0.38, yAbove: 150, w: 110 },
            { xFrac: 0.62, yAbove: 150, w: 110 },
            { xFrac: 0.85, yAbove: 72,  w: 130 },
            // Middle tier
            { xFrac: 0.28, yAbove: 145, w: 120 },
            { xFrac: 0.72, yAbove: 145, w: 120 },
            // Upper tier — center platform, panda spawns here
            { xFrac: 0.50, yAbove: 210, w: 140 },
            // Top platform
            { xFrac: 0.50, yAbove: 275, w: 100 },
          ],
          props: [], // generated dynamically in create() based on scene width
          signs: [
            { xFrac: 0.22, modalId: "landing"  },
            { xFrac: 0.41, modalId: "projects" },
            { xFrac: 0.59, modalId: "about"    },
            { xFrac: 0.78, modalId: "reading"  },
          ],
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
          this.anims.create({
            key: "IdleSouth",
            frames: Array.from({ length: 8 }, (_, i) => ({ key: `rp2-idle-south-${i}` })),
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
        private escKey!:   Phaser.Input.Keyboard.Key;

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
        // Dad-joke bubble
        private jokeBubble: Phaser.GameObjects.Container | null = null;
        private jokeShown  = false;

        private lastInputTime = 0;   // ms timestamp of last key press
        private readonly IDLE_DELAY  = 3000; // ms before idle animation kicks in
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
          this.lastInputTime  = 0;
          this.jokeBubble     = null;
          this.jokeShown      = false;
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

          // ── Idle-south frames (8 frames) ─────────────────────────────────────
          for (let i = 0; i < 8; i++) {
            if (!this.textures.exists(`rp2-idle-south-${i}`))
              this.load.image(`rp2-idle-south-${i}`,
                `${RP_BASE}/${ANIM_DIRS.idle}/south/frame_${padN(i)}.png`);
          }

          // ── Dad jokes ────────────────────────────────────────────────────────
          if (!this.cache.json.exists("dad-jokes"))
            this.load.json("dad-jokes", "/dad-jokes.json");

          // ── Room 0 background ────────────────────────────────────────────────
          if (!this.textures.exists("bg-forest"))
            this.load.image("bg-forest", "/sprites/forest-background.jpg");

          // ── Prop textures — load once, skip if already cached ────────────────
          const propAssets: [string, string][] = [
            ["fir-tree",         "/props/fir-tree.png"],
            ["tree-himalaya",    "/props/tree-himalaya.png"],
            ["bamboo",           "/props/bamboo.png"],
            ["flowers-forest",   "/props/flowers-forest.png"],
            ["sign-mossy",       "/props/sign-mossy.png"],
            ["sign-jungle",      "/props/sign-jungle.png"],
            ["sign-bamboo",      "/props/sign-bamboo.png"],
            ["sign-lantern",     "/props/sign-lantern.png"],
            ["sign-now",         "/props/sign-now.png"],
            ["fern-cluster",     "/props/fern-cluster.png"],
            ["mushrooms",        "/props/mushrooms.png"],
            ["mossy-rocks",      "/props/mossy-rocks.png"],
            ["log-hollow",       "/props/log-hollow.png"],
            ["statue-linkedin",      "/props/statue-linkedin.png"],
            ["statue-github",        "/props/statue-github.png"],
            ["statue-email",         "/props/statue-email.png"],
            ["stone-emblem-display", "/props/stone-emblem-display.png"],
            ["github-badge",         "/props/github-badge.png"],
            ["linkedin-badge",       "/props/linkedin-badge.png"],
            ["gmail-badge",          "/props/gmail-badge.png"],
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
          // Depths for ground layers — must sit above player (D_PLAYER=10), signs (D_SIGN=16), badges (D_FGPROP=15)
          const D_GRASS_BACK = 800;  // grass backing rect
          const D_GRASS      = 850;  // grass tile layer
          const D_DIRT_BACK  = 700;  // dirt backing rect
          const D_DIRT       = 750;  // dirt tile layers
          // Backings — skip grass backing for room 0 (forest bg shows through fine)
          const hasBgImage = this.roomIndex === 0 && this.textures.exists("bg-forest");
          if (!hasBgImage)
            this.add.rectangle(0, groundY, width, grassH, 0x3a7a18).setOrigin(0, 0).setDepth(D_GRASS_BACK);
          this.add.rectangle(0, groundY + grassH,          width, dirtH,  0x6b3a1a).setOrigin(0, 0).setDepth(D_DIRT_BACK);
          this.add.rectangle(0, groundY + grassH + dirtH,  width, stoneH, 0x2e2e2e).setOrigin(0, 0).setDepth(D_GROUND - 0.1);
          // Dirt tile layers — above player/signs/badges but below grass
          const tileW = 32;
          const addTileLayers = (
            y: number, h: number,
            keys: [string, string, string, string],
            baseDepth: number
          ) => {
            const [k0, k90, k180, k270] = keys;
            if (!this.textures.exists(k0)) return;
            this.add.tileSprite(0,            y, width,            h, k0  ).setOrigin(0,0).setDepth(baseDepth);
            if (this.textures.exists(k90))
              this.add.tileSprite(-tileW*0.25, y, width+tileW*0.25, h, k90 ).setOrigin(0,0).setDepth(baseDepth).setAlpha(0.6);
            if (this.textures.exists(k180))
              this.add.tileSprite(-tileW*0.5,  y, width+tileW*0.5,  h, k180).setOrigin(0,0).setDepth(baseDepth).setAlpha(0.45);
            if (this.textures.exists(k270))
              this.add.tileSprite(-tileW*0.75, y, width+tileW*0.75, h, k270).setOrigin(0,0).setDepth(baseDepth).setAlpha(0.3);
          };
          if (this.textures.exists("grass-tile"))
            this.add.tileSprite(0, groundY, width, grassH, "grass-tile").setOrigin(0,0).setDepth(D_GRASS);
          // Thin grass edge — absolute front of scene (above mist, player, everything)
          if (this.textures.exists("grass-tile"))
            this.add.tileSprite(0, groundY, width, 12, "grass-tile")
              .setOrigin(0, 0).setDepth(1000);
          addTileLayers(
            groundY + grassH, dirtH,
            ["grass-dirt-fill","grass-dirt-fill-r90","grass-dirt-fill-r180","grass-dirt-fill-r270"],
            D_DIRT
          );
          addTileLayers(
            groundY + grassH + dirtH, stoneH,
            ["stone-dirt-fill","stone-dirt-fill-r90","stone-dirt-fill-r180","stone-dirt-fill-r270"],
            D_GROUND
          );

          // ── Resolve props: dynamic generation for room 0, static for others ────
          // yAbove: negative = image bottom sinks below groundY (compensates for transparent padding)
          const PROP_YABOVE: Record<string, number> = {
            "tree-himalaya":  -23,
            "fir-tree":       -30,
            "bamboo":         -27,
            "flowers-forest": -21,
            "fern-cluster":   -19,
            "mushrooms":      -23,
            "mossy-rocks":    -18,
            "log-hollow":     -33,
          };
          const PROP_LAYER: Record<string, "bg" | "fg"> = {
            "fir-tree": "bg", "tree-himalaya": "bg", "bamboo": "bg", "mossy-rocks": "bg", "log-hollow": "bg",
            "flowers-forest": "fg", "fern-cluster": "fg", "mushrooms": "fg",
          };
          let resolvedProps: PropDef[];
          if (this.roomIndex === 0) {
            // Fixed anchor props — large statement bg features
            const anchors: PropDef[] = [
              // Tall fir tree centred in the scene (falls back to tree-himalaya if not loaded yet)
              { key: "tree-himalaya", xFrac: 0.50, yAbove: -60, scale: 4.5, layer: "bg" },
              // Bamboo groves at the far sides
              { key: "bamboo", xFrac: 0.10, yAbove: -27, scale: 1.3, layer: "bg" },
              { key: "bamboo", xFrac: 0.88, yAbove: -27, scale: 1.1, flipX: true, layer: "bg" },
            ];
            // Ground-cover pool — sparse; 1 prop per ~180px, min 2
            const poolKeys = ["flowers-forest", "fern-cluster", "mushrooms", "mossy-rocks", "log-hollow"]
              .filter(k => this.textures.exists(k));
            const coverCount = Math.max(2, Math.round(width / 180));
            const coverProps: PropDef[] = Array.from({ length: coverCount }, (_, i) => {
              const xFrac = (i + 0.2 + Math.random() * 0.60) / coverCount;
              const key   = poolKeys[Math.floor(Math.random() * poolKeys.length)];
              return {
                key,
                xFrac,
                yAbove: PROP_YABOVE[key] ?? -19,
                scale:  0.85 + Math.random() * 0.45,
                flipX:  Math.random() > 0.5,
                layer:  PROP_LAYER[key] ?? "fg",
              };
            });
            resolvedProps = [...anchors, ...coverProps];
          } else {
            resolvedProps = theme.props;
          }

          // ── Background props (trees, terminals, shelves — behind player) ───────
          for (const prop of resolvedProps.filter(p => (p.layer ?? "bg") === "bg")) {
            if (!this.textures.exists(prop.key)) continue;
            const img = this.add.image(
              Math.round(prop.xFrac * width),
              groundY - (prop.yAbove ?? 0),
              prop.key
            ).setOrigin(0.5, 1).setScale(prop.scale ?? 1).setDepth(D_BGPROP);
            if (prop.flipX) img.setFlipX(true);
            // Wind sway: only bamboo and the main tree sway
            if (this.roomIndex === 0 && (prop.key === "bamboo" || prop.key === "fir-tree")) {
              const swing = prop.key === "bamboo" ? 2.2 : 1.0;
              this.tweens.add({
                targets: img,
                angle: swing * (Math.random() > 0.5 ? 1 : -1),
                duration: 2200 + Math.random() * 1400,
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

          // Instructions — room 0 only, top-center
          if (this.roomIndex === 0) {
            this.add.text(width / 2, 18, "WASD / Arrow Keys to move   ·   ESC for portfolio", {
              fontFamily: "Arial, Helvetica, sans-serif",
              fontStyle: "bold",
              fontSize: "16px",
              color: "#ffffff",
              stroke: "#000000",
              strokeThickness: 3,
            }).setOrigin(0.5, 0).setAlpha(0.92).setDepth(D_UI);
          }


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
            // One-way: only collide from above — no sideways / bottom bumping
            const platBody = body.body as Phaser.Physics.Arcade.StaticBody;
            platBody.checkCollision.left  = false;
            platBody.checkCollision.right = false;
            platBody.checkCollision.down  = false;
            if (useWoodTile) {
              // Wood tile tileSprite — setTileScale(0.5, 0.875) makes tiles denser horizontally
              const ts = this.add.tileSprite(px, py, def.w, PLAT_H, "platform-wood")
                .setOrigin(0.5, 0.5).setDepth(D_PLATFORM);
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
          // Per-modalId override: force a specific sign sprite instead of cycling
          const SIGN_KEY_OVERRIDE: Record<string, string> = {
            "about": "sign-now",
          };
          // Only include keys that are actually loaded
          const availableSignKeys = SIGN_KEYS.filter(k => this.textures.exists(k));
          // Transparent bottom padding per sign (px at scale 1); used to sink image so it sits flush
          const SIGN_SINK: Record<string, number> = {
            "sign-jungle":  19,
            "sign-bamboo":  29,
            "sign-lantern": 25,
            "sign-mossy":   21,
            "sign-now":     32,
          };
          // Per-sign label Y offset relative to groundY
          const SIGN_LABEL_Y: Record<string, number> = {
            "landing":  groundY - 70,  // "About Me" — lower on the board
            "projects": groundY - 70,  // "Projects" — lower on the board
            "about":    groundY - 92,  // "Now" — raised to match sign shift
            "reading":  groundY - 100, // "Reading" — pull upward (taller sprite)
          };
          // Unified color scheme: warm cream text, dark green 2px border
          const SIGN_LABEL_COLOR  = "#f5eecc";
          const SIGN_LABEL_STROKE = "#1a3d0f";
          // Per-sign hover hint Y ([ ENTER ] prompt)
          const SIGN_HINT_Y: Record<string, number> = {
            "landing":  groundY - 52,
            "projects": groundY - 52,
            "about":    groundY - 72,
            "reading":  groundY - 76,
          };
          this.signDefs  = [];
          this.signHints = [];
          for (let si = 0; si < theme.signs.length; si++) {
            const sd = theme.signs[si];
            const sx = Math.round(sd.xFrac * width);
            this.signDefs.push({ x: sx, modalId: sd.modalId });
            // Use per-modalId override if present, otherwise cycle through available keys
            const overrideKey = SIGN_KEY_OVERRIDE[sd.modalId];
            const usedKey = overrideKey && this.textures.exists(overrideKey)
              ? overrideKey
              : availableSignKeys.length > 0
                ? availableSignKeys[si % availableSignKeys.length]
                : null;
            const sink    = usedKey ? (SIGN_SINK[usedKey] ?? 6) : 0;
            const boardY  = groundY - 52;
            if (usedKey) {
              this.add.image(sx, groundY + sink, usedKey)
                .setOrigin(0.5, 1).setScale(2).setDepth(D_SIGN);
              // Label on board
              const label  = SIGN_NAMES[sd.modalId] ?? "ENT";
              const labelY = SIGN_LABEL_Y[sd.modalId] ?? groundY - 88;
              this.add.text(sx, labelY, label, {
                fontFamily: "Arial, Helvetica, sans-serif",
                fontStyle: "bold",
                fontSize: "13px",
                color: SIGN_LABEL_COLOR,
                stroke: SIGN_LABEL_STROKE,
                strokeThickness: 2,
              }).setOrigin(0.5).setDepth(D_SIGN + 0.1);
            } else {
              this.add.rectangle(sx, groundY - 18, 5, 34, 0x4a2a0a).setDepth(D_SIGN);
              this.add.rectangle(sx, boardY, 90, 36, 0x7a4e22)
                .setStrokeStyle(2, 0xb07840).setDepth(D_SIGN);
              this.add.rectangle(sx, boardY, 82, 28, 0x8f5e2a).setDepth(D_SIGN);
              this.add.text(sx, boardY, SIGN_NAMES[sd.modalId] ?? "ENT", {
                fontFamily: "Arial, Helvetica, sans-serif",
                fontStyle: "bold",
                fontSize: "13px",
                color: "#d4a06a",
              }).setOrigin(0.5).setDepth(D_SIGN);
            }
            const hintY = SIGN_HINT_Y[sd.modalId] ?? groundY - 76;
            const hint = this.add.text(sx, hintY, "[ ENTER ]", {
              fontFamily: "Arial, Helvetica, sans-serif",
              fontStyle: "bold",
              fontSize: "11px",
              color: "#ffffff",
              stroke: "#1a3a10",
              strokeThickness: 2,
            }).setOrigin(0.5).setAlpha(0).setDepth(D_UI);
            this.signHints.push(hint);
          }

          // ── Social badges — underground stone display, click to open ─────────────
          this.socialLinks = [];
          this.socialHints = [];
          if (theme.socials) {
            const badgeKeyMap: Record<string, string> = {
              "LinkedIn": "linkedin-badge",
              "GitHub":   "github-badge",
              "Email":    "gmail-badge",
            };
            // Sink badges solidly into the stone tile layer
            const badgeY = groundY + grassH + dirtH + 48;
            for (const soc of theme.socials) {
              const sx = Math.round(soc.xFrac * width);
              this.socialLinks.push({ x: sx, url: soc.url });
              if (this.textures.exists("stone-emblem-display"))
                this.add.image(sx, badgeY, "stone-emblem-display")
                  .setOrigin(0.5, 0.5).setDepth(D_FGPROP);
              const badgeKey = badgeKeyMap[soc.label];
              if (badgeKey && this.textures.exists(badgeKey)) {
                const badgeImg = this.add.image(sx, badgeY, badgeKey)
                  .setOrigin(0.5, 0.5).setDepth(D_FGPROP + 0.1);
                badgeImg.setInteractive({ useHandCursor: true });
                badgeImg.on("pointerdown", () => window.open(soc.url, "_blank"));
              }
              // "click me!" hint below the GitHub badge
              if (soc.label === "GitHub") {
                this.add.text(sx, badgeY + 48, "click me!", {
                  fontFamily: "Arial, Helvetica, sans-serif",
                  fontStyle:  "bold",
                  fontSize:   "14px",
                  color:      "#f5eecc",
                  stroke:     "#1a3d0f",
                  strokeThickness: 2,
                }).setOrigin(0.5, 0).setDepth(D_FGPROP + 0.2);
              }
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
              const mistCount = 22 + Math.floor(Math.random() * 6); // 22-27
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
          for (const prop of resolvedProps.filter(p => p.layer === "fg")) {
            if (!this.textures.exists(prop.key)) continue;
            const img = this.add.image(
              Math.round(prop.xFrac * width),
              groundY - (prop.yAbove ?? 0),
              prop.key
            ).setOrigin(0.5, 1).setScale(prop.scale ?? 1).setDepth(D_FGPROP);
            if (prop.flipX) img.setFlipX(true);
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
          this.escKey   = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

          this.cameras.main.fadeIn(200, 0, 0, 0);
        }

        update() {
          if (this.transitioning) return;

          // ESC — navigate to /boring (React handler decides if modal is open first)
          if (Phaser.Input.Keyboard.JustDown(this.escKey)) {
            window.dispatchEvent(new CustomEvent("game-esc"));
          }

          const body     = this.player.body as Phaser.Physics.Arcade.Body;
          const onGround = body.blocked.down;
          const { width } = this.scale;

          const left  = this.cursors.left.isDown  || this.wasd.left.isDown;
          const right = this.cursors.right.isDown || this.wasd.right.isDown;
          const sprint = this.shiftKey.isDown;
          const jumpPressed =
            Phaser.Input.Keyboard.JustDown(this.cursors.up) ||
            Phaser.Input.Keyboard.JustDown(this.wasd.up)    ||
            Phaser.Input.Keyboard.JustDown(this.jumpKey);

          const speed    = sprint ? this.SPEED * 1.75 : this.SPEED;
          const anyInput = left || right || jumpPressed;
          const idleMs   = this.time.now - this.lastInputTime;

          // Any input resets idle timer and hides active joke bubble
          if (anyInput) {
            this.lastInputTime = this.time.now;
            this.hideJoke();
          }

          // ── Normal movement ────────────────────────────────────────────────────
          if (left)       { body.setVelocityX(-speed); this.player.setFlipX(true); }
          else if (right) { body.setVelocityX(speed);  this.player.setFlipX(false); }
          else            { body.setVelocityX(0); }

          if (jumpPressed && onGround) body.setVelocityY(this.JUMP_VY);

          // Animation state machine
          if (!onGround) {
            this.player.play("Jump", true);
          } else if (left || right) {
            this.player.play(sprint ? "Run" : "Walk", true);
          } else if (idleMs >= this.IDLE_DELAY) {
            // 3s+ idle — face viewer (south idle)
            this.player.play("IdleSouth", true);
            if (idleMs >= 10000 && !this.jokeShown) this.showJoke();
          } else {
            // Just stopped — play east idle immediately
            this.player.play("Idle", true);
          }

          // Keep joke bubble over panda's head
          if (this.jokeBubble) {
            this.jokeBubble.setPosition(this.player.x, this.player.y - 70);
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

        private showJoke(): void {
          if (this.jokeShown) return;
          this.jokeShown = true;

          const jokes: string[] = this.cache.json.get("dad-jokes") ?? [];
          if (!jokes.length) return;
          const joke = jokes[Math.floor(Math.random() * jokes.length)];

          const pad   = 14;
          const maxW  = 220;
          const tailH = 10;
          const jokeFont = "Comic Sans MS, Chalkboard SE, Marker Felt, cursive";

          // Probe text dimensions then discard
          const probe = this.add.text(0, -9999, joke, {
            fontFamily: jokeFont, fontSize: "15px",
            wordWrap: { width: maxW - pad * 2 },
          });
          const bw = Math.min(Math.ceil(probe.width)  + pad * 2, maxW);
          const bh = Math.ceil(probe.height) + pad * 2;
          probe.destroy();

          // Bubble graphics — off-white, slightly green-tinted
          const gfx = this.add.graphics();
          gfx.fillStyle(0xeef8ee, 0.96);
          gfx.lineStyle(1.5, 0x5aaa6a, 0.85);
          gfx.fillRoundedRect(-bw / 2, -(bh + tailH), bw, bh, 8);
          gfx.strokeRoundedRect(-bw / 2, -(bh + tailH), bw, bh, 8);
          // Tail pointer
          gfx.fillStyle(0xeef8ee, 0.96);
          gfx.fillTriangle(-7, -tailH, 7, -tailH, 0, 0);

          const txt = this.add.text(0, -(bh / 2 + tailH), joke, {
            fontFamily: jokeFont, fontSize: "15px",
            color: "#1a3a1a",
            wordWrap: { width: maxW - pad * 2 },
            align: "center",
          }).setOrigin(0.5, 0.5);

          this.jokeBubble = this.add.container(
            this.player.x, this.player.y - 70, [gfx, txt]
          ).setDepth(25);
        }

        private hideJoke(): void {
          if (!this.jokeShown) return;
          this.jokeShown = false;
          this.jokeBubble?.destroy();
          this.jokeBubble = null;
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

      // ── Room scene ────────────────────────────────────────────────────────────
      class LandingScene extends RoomScene { constructor() { super({ key: "landing" }, 0); } }

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
        scene: [LandingScene],
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
