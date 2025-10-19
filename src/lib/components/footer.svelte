<script lang="ts">
  import { Badge } from '~/lib/components/ui/badge';
  import { GitBranch, Tag } from '@lucide/svelte';
  import { version } from '../../../package.json';
  import { onMount } from 'svelte';

  interface Commit {
    sha: string;
    message: string;
    url: string;
  }

  let commit: Commit | null = null;

  onMount(async () => {
    try {
      const res = await fetch(
        'https://api.github.com/repos/xivselch/api/commits?per_page=1'
      );
      if (res.ok) {
        const [latest] = await res.json();
        commit = {
          sha: latest.sha,
          message: latest.commit.message,
          url: latest.html_url,
        };
      } else {
        commit = {
          sha: 'unknown',
          message: 'No commits found',
          url: 'https://github.com/xivselch/api',
        };
      }
    } catch (err) {
      console.error('Failed to fetch latest commit:', err);
    }
  });
</script>

<footer class="bg-background border-border/25 border-t">
  <div class="mx-auto w-full max-w-screen-xl space-y-6 px-4 py-8 md:space-y-8">
    <div
      class="text-accent-foreground/50 flex flex-col items-center justify-between gap-4 text-center text-sm md:flex-row md:gap-0 md:text-left"
    >
      <div
        class="flex flex-col-reverse items-center gap-2 md:flex-col md:items-start"
      >
        {#if commit}
          <p
            class="flex flex-wrap items-center justify-center gap-2 md:justify-start"
          >
            <a
              href={commit.url}
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-1"
            >
              <Badge variant="secondary" title={commit.message}>
                <GitBranch class="h-4 w-4" />
                {commit.sha.slice(0, 7)}
              </Badge>
            </a>
            <span class="text-muted-foreground hidden sm:inline">·</span>
            <Badge
              variant="outline"
              title="Site version"
              class="flex items-center gap-1"
            >
              <Tag class="h-4 w-4" />
              {version}
            </Badge>
          </p>
        {/if}
        <p
          class="text-accent-foreground/75 mb-2 text-center text-sm md:mb-0 md:text-left"
        >
          &copy; {new Date().getFullYear()} Emet-Selch. All rights reserved.
        </p>
      </div>
      <div class="max-w-xl text-xs leading-relaxed md:text-right">
        <p>
          FINAL FANTASY XIV &copy; SQUARE ENIX CO., LTD. All Rights Reserved.
        </p>
        <p>
          This website is not affiliated with or endorsed by Square Enix
          Holdings Co., Ltd. or its subsidiaries. FINAL FANTASY is a registered
          trademark of Square Enix Holdings Co., Ltd.
        </p>
      </div>
    </div>
  </div>
</footer>
