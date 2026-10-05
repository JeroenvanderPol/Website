# Working with AI agents

Start with the root [AGENTS.md](../../AGENTS.md). It contains repository-wide working conventions. [Project context](project-context.md) explains the POC, architecture, and known limitations.

The confirmed product brief lives in [PRODUCT.md](../../PRODUCT.md). The original POC has been restored; no new visual direction is approved. Compare three local options at `/design-directions` and read [design-directions.md](design-directions.md). [DESIGN.md](../../DESIGN.md) records baseline status; [homepage-brief.md](homepage-brief.md) records the user selection gate.

## Layout

```text
AGENTS.md                           Repository instructions
docs/ai/README.md                   Setup, usage, and maintenance
docs/ai/project-context.md          Durable project context
.agents/impeccable.lock.json        Exact source revision and file hashes
.agents/third-party/impeccable/      Upstream license and attribution
.agents/skills/impeccable/           Official skill and supporting files
```

Skills are installed locally to this repository, so collaborators receive them with the code. No global agent settings or application dependencies are required for skill discovery. Codex's repository skill convention is `.agents/skills/`; see the [official skills documentation](https://developers.openai.com/codex/skills/). Other tools can be pointed to `AGENTS.md` and the same skill file without duplicating instructions.

## Impeccable

Source: [Impeccable](https://impeccable.style/) / [official repository](https://github.com/pbakaus/impeccable).

Installed skill version: **4.3.1**. Upstream commit: `0a4e72a254f3b175c95b36b82e5f2e60fa63f116`.

This is the official unified `impeccable` skill, including its command references and launchers. Start a new turn after installation for skill discovery. Example Codex requests:

```text
$impeccable critique the homepage, using the original website and POC as context
$impeccable audit the reviews section for accessibility and mobile usability
$impeccable polish the contact section while preserving its Dutch copy
```

Ask for `init` when ready to establish the product brief, or `document` to record the existing design system. Installation alone does not run those workflows or alter the site.

The upstream context launcher is `scripts/impeccable` inside the skill directory; on Windows use `scripts/impeccable.cmd`. It can download a versioned engine to the user's Impeccable cache on first use. That optional runtime is separate from the installed skill files and is not an application dependency. Follow the skill's documented fallback if the launcher cannot run. Browser live mode and detector hooks are not enabled by this setup.

## Maintaining skills

1. Select an explicit commit from the official upstream repository and review the change.
2. Use Codex's `skill-installer` with repo `pbakaus/impeccable`, that commit as `--ref`, path `.agents/skills/impeccable`, and a temporary staging directory as `--dest`. The installer refuses to overwrite an existing skill.
3. Compare the staged files against the installed copy, then replace only the intended skill files, removing obsolete upstream files as needed.
4. Retain the upstream `LICENSE` and `NOTICE.md` from the same commit in `.agents/third-party/impeccable/`.
5. Update `.agents/impeccable.lock.json` with the source revision, declared skill version, and SHA-256 hashes for all installed skill and attribution files; review references and the Git diff.

Add future skills under `.agents/skills/<name>/SKILL.md`, including `name` and `description` in YAML frontmatter. Keep secrets, generated caches, and machine-specific paths out of committed guidance. Prefer small instructions with linked context rather than copying the same rules into several agent-specific files.
