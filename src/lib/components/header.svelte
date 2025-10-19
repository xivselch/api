<script lang="ts">
  import type { Atom } from 'better-auth/svelte';
  import type { Session } from '~/auth';
  import { client, signIn, signOut, useSession } from '~/lib/auth-client';
  import * as DropdownMenu from './ui/dropdown-menu';
  import * as Avatar from './ui/avatar';
  import { Button } from './ui/button';
  import { Toggle } from './ui/toggle';
  import { theme } from '../stores';

  import Logo from '~/assets/logo.svelte';
  import { LogOutIcon, MoonStarIcon, SunIcon } from '@lucide/svelte';
  import { Separator } from './ui/separator';
  import { toast } from 'svelte-sonner';

  const session = useSession() as unknown as Atom<{ data: Session }>;
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = $theme === 'dark' || ($theme === 'auto' && systemDark);

  let pressed = $state(isDark);
</script>

<header
  class="bg-background border-border/25 sticky top-0 z-50 w-full border-b"
>
  <div
    class="mx-auto border-b border-amber-500/20 bg-amber-500/10 py-2 text-center text-sm text-amber-500"
  >
    ⚠️ <span class="font-bold">This platform is still in development!</span>
    Some features may not be available yet.
  </div>
  <div class="mx-auto max-w-screen-xl px-4">
    <div
      class="flex h-16 w-full items-center justify-between gap-2 **:data-[slot=separator]:h-4"
    >
      <Button
        href="/"
        variant="ghost"
        size="icon"
        class="flex size-10 items-center justify-center rounded-md"
      >
        <Logo class="size-8" />
      </Button>
      <div class="text-muted-foreground ml-auto flex items-center gap-2">
        <div class="hidden gap-2 sm:flex">
          <Button href="https://emetselch.xyz/discord" variant="ghost" size="sm"
            >Discord</Button
          >
          <Button href="https://github.com/xivselch" variant="ghost" size="sm"
            >Github</Button
          >
        </div>
        <Separator orientation="vertical" class="hidden sm:block" />
        {#if !$session.data?.user}
          <Button onclick={() => signIn()}>Login with Discord</Button>
        {:else}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Avatar.Root
                class="border-border/5 mx-2 size-9 cursor-pointer border"
              >
                <Avatar.Image
                  src={$session.data.user.image}
                  alt={$session.data.user.name}
                />
                <Avatar.Fallback>
                  {$session.data.user.name.match(/\b(\w)/g)?.join('')}
                </Avatar.Fallback>
              </Avatar.Root>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end" class="w-56 overflow-ellipsis">
              <DropdownMenu.Label class="mx-1">
                <h3 class="text-sm font-semibold">
                  {$session.data.user.name}
                </h3>
                <p class="text-muted-foreground text-sm">
                  @{$session.data.user.username}
                </p>
              </DropdownMenu.Label>
              <DropdownMenu.Separator />
              <DropdownMenu.Group>
                <a href="/account">
                  <DropdownMenu.Item class="mx-1 cursor-pointer"
                    >Account settings</DropdownMenu.Item
                  >
                </a>
              </DropdownMenu.Group>
              <DropdownMenu.Separator />
              <DropdownMenu.Item
                onclick={() => signOut()}
                class="mx-1 cursor-pointer"
              >
                Log out <LogOutIcon class="ml-auto size-4" />
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        {/if}
        <Separator orientation="vertical" />
        <Toggle
          aria-label="toggle mode"
          class="data-[state=on]:hover:bg-accent border-0 shadow-none data-[state=on]:bg-transparent"
          variant="outline"
          bind:pressed
          onPressedChange={value => theme.set(value ? 'dark' : 'light')}
        >
          <MoonStarIcon class="hidden dark:flex" />
          <SunIcon class="flex dark:hidden" />
        </Toggle>
      </div>
    </div>
  </div>
</header>
