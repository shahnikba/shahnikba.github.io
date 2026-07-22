# code/

Runnable source that accompanies the writing notes. Kept in this repo so a
note and its code are versioned together, but outside `app/` and `content/`
so nothing here becomes a site route or part of the Next build.

## Convention

One folder per note, named after the note's slug:

```
code/
  <note-slug>/
    README.md        how to build/run + anything worth flagging
    <source files>   the runnable code the note refers to
```

The slug is the note's `slug:` frontmatter (and its URL:
`/writing/<note-slug>`), so the folder is trivial to find from either side.

## Referencing it from a note

Link to the source on GitHub and quote inline only the few lines that carry
the argument — the notes have no syntax highlighter, so a full file inline is
just a wall of grey text. Blob URL shape:

```
https://github.com/shahnikba/shahnikba.github.io/blob/main/code/<note-slug>/<file>
```

## Existing

- [`local-vol-callable-cms/`](local-vol-callable-cms/) — callable CMS priced
  under local vs stochastic vol
  ([note](https://shahnikba.github.io/writing/local-vol-callable-cms))
