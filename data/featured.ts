/** Curated featured items shown on the home page. */

export type Featured = {
  title: string;
  href: string;
  meta: string;
  blurb: string;
};

export const FEATURED: Featured[] = [
  {
    title: "Ainemox — a one-person HFT market-maker",
    href: "/work/ainemox/",
    meta: "Founder, 2021–2022 · C, C++, AWS",
    blurb:
      "A crypto market-making firm I ran solo from 2021 to 2022. Five exchanges, sub-millisecond latency, pure C and C++ written from scratch with no external libraries. A surprising amount of the work turned out to be boring engineering discipline — reproducible builds, careful logging, idempotent restarts. The microstructure was the easy part.",
  },
  {
    title: "Hybrid pricing on CUDA — a small piece of finance history",
    href: "/work/bnp-paribas/",
    meta: "BNP Paribas, 2008 · C++, CUDA",
    blurb:
      "Porting hybrid interest-rate / FX pricing to CUDA GPU in 2008, when most of the industry hadn't heard of NVIDIA and the phrase 'GPGPU' still needed an explanation. Orders-of-magnitude speed-up on Monte-Carlo and PDE solvers turned overnight risk into intraday risk. The first time hybrid pricing had been done on a GPU inside a bank.",
  },
  {
    title: "Bedtime and the heart — a UK Biobank study",
    href: "/work/huma/",
    meta: "Huma, 2018–2023 · PyTorch, causal ML",
    blurb:
      "Deep-learning models on wrist-accelerometer data at UK Biobank scale led to a peer-reviewed European Heart Journal paper linking sleep-onset timing to cardiovascular events. The U-shaped curve — lowest risk around 10–11pm bedtime — was picked up by BBC, The Washington Post, and The Guardian.",
  },
];
