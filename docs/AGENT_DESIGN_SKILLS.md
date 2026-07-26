# Agent Design Skills

This Horizon Digital project is implemented by Claude/OpenCode inside the repo, while Hermes owns design-skill routing and high-level orchestration.

## Policy

Do **not** load every design skill for every task. Use the default Horizon Digital bundle below for premium website work. When Hermes orchestrates, use its selected route; when OpenCode or Claude is invoked directly, record the same route before implementation.

```text
Design route
- Domain/product skill: Horizon Digital premium website
- Visual direction: established | skill required | not relevant
- Component/implementation skill:
- Motion: CSS/restraint | Emil/GSAP required | not relevant
- Interface polish: required | optional | not relevant — reason
- Final verification: frontend design quality gate
```

## Default bundle for Horizon Digital premium websites

1. **Horizon Digital Premium Websites** — premium custom-code client websites, HD brand rules, no templates/fake proof, strong CTA and credibility.
2. **Creative Web Artifacts** — HTML mockups, landing-page prototypes, design studies, visual comparison artifacts.
3. **Web Design Style Library** — visual direction/reference families and token exploration.
4. **Impeccable Frontend Craft** — static/structural implementation craft and evidence-based polish for production-facing UI.
5. **Frontend Design Quality Gate** — build/browser/responsive/console checks before claiming UI complete.

Optional only when needed:

- **Emil Kowalski Motion Polish** — interaction states, interruption/reversal, enter/exit behavior, and restrained component motion.
- **GSAP Web Animation** — scroll storytelling, premium motion, timeline/ScrollTrigger work, reduced-motion/performance.
- **Mobile App UI Design** — mobile-first interactions and thumb-zone UX if the site behaves like a mobile app.
- **shadcn/ui Components** — only if the project uses React/Tailwind/shadcn component primitives.

## Project design source of truth

Before substantial UI work, read whichever exists:

- `DESIGN.md`
- `DESIGN_SYSTEM.md`
- `docs/DESIGN.md`
- `docs/DESIGN_SYSTEM.md`
- this file

If no design-system file exists, propose one before large frontend changes.

## Hermes skill files available locally

When you need the full guidance, read only the relevant files:

```text
/home/gpanagary/.hermes/skills/creative/design-skill-stack/SKILL.md
/home/gpanagary/.hermes/skills/creative/horizon-digital-premium-websites/SKILL.md
/home/gpanagary/.hermes/skills/creative/creative-web-artifacts/SKILL.md
/home/gpanagary/.hermes/skills/creative/web-design-style-library/SKILL.md
/home/gpanagary/.hermes/skills/software-development/gsap-web-animation/SKILL.md
/home/gpanagary/.hermes/skills/creative/mobile-app-ui-design/SKILL.md
/home/gpanagary/.hermes/skills/software-development/shadcn-ui-components/SKILL.md
/home/gpanagary/.hermes/skills/software-development/frontend-design-quality-gate/SKILL.md
```

## Agent-agnostic source resolution

Central skill roots:

```text
WSL:     /mnt/c/Users/gpanagary/central-agent-skills
Windows: C:\Users\gpanagary\central-agent-skills
```

| Capability | Project minimum | Central agent skill | Hermes-local full source |
|---|---|---|---|
| Domain, conversion, proof and HD boundaries | This file plus `master_brief.md`, brand and knowledge files | `skills/design/horizon-digital-premium-website/SKILL.md` | `/home/gpanagary/.hermes/skills/creative/horizon-digital-premium-websites/SKILL.md` |
| Visual direction | This file and project brand references | `skills/design/taste-premium-web-design/SKILL.md` | `/home/gpanagary/.hermes/skills/creative/web-design-style-library/SKILL.md` |
| Static interface craft | Completion standard below | `skills/design/impeccable-frontend-craft/SKILL.md` | `/home/gpanagary/.hermes/skills/creative/interface-polish-engineering/SKILL.md` |
| Motion and micro-interactions | Existing project interaction conventions and completion standard | `skills/design/emil-kowalski-motion-polish/SKILL.md` | `/home/gpanagary/.hermes/skills/software-development/gsap-web-animation/SKILL.md` for complex GSAP work |
| Components/mobile/artifacts | Existing project stack and this file | No central equivalent currently | Use the applicable Hermes paths above when readable |
| Final QA | Completion standard below | `skills/design/impeccable-frontend-craft/SKILL.md` supplies craft review only | `/home/gpanagary/.hermes/skills/software-development/frontend-design-quality-gate/SKILL.md` |

Read a central or Hermes file only when the task needs that capability and the path is accessible. If a named source cannot be read, apply this project's embedded minimum, report the missing source, and do not claim its full checklist was performed.

## Completion standard for UI work

Before saying frontend/UI work is complete:

- run available lint/typecheck/build commands;
- inspect key routes/components in browser where possible;
- check console errors;
- check mobile/responsive behavior;
- avoid fake proof/placeholders in production-intended site content;
- record whether interface polish was required, optional, or not relevant and what was actually inspected;
- summarize what was verified and what remains unverified.
