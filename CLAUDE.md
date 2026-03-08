# Tools

### Use `pnpm` instead of `npm`

Example:

- `npm i` -> `pnpm i`
- `npm run build` -> `pnpm run build`
- `npx some-thing` -> `pnpm dlx some-thing`

### Use `rg` instead of `grep`

Faster, respects `.gitignore`, and has better defaults.

```bash
# ✅ Prefer
rg "TODO" ./src
rg -i "error" --type py ./logs

# ❌ Avoid
grep -r "TODO" ./src
grep -ri "error" --include="*.py" ./logs
```

### 📁 Use `fd` instead of `find`

Simpler syntax, faster, ignores hidden/ignored files by default.

```bash
# ✅ Prefer
fd "*.log" ./var
fd -e py -t f ./src

# ❌ Avoid
find ./var -name "*.log"
find ./src -name "*.py" -type f
```

### 🗑️ Use `trash` / `trash-put` instead of `rm -rf`

Sends files to trash instead of permanently deleting — safer and recoverable.

```bash
# ✅ Prefer
trash ./dist
trash-put config.bak

# ❌ Avoid
rm -rf ./dist
rm -f config.bak
```
