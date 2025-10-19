<script lang="ts">
  import type { Atom } from 'better-auth/svelte';
  import type { Session } from '~/auth';
  import { client, useSession } from '~/lib/auth-client';
  import * as Field from '~/lib/components/ui/field';
  import { Button, buttonVariants } from '~/lib/components/ui/button';
  import { toast } from 'svelte-sonner';
  import { KeyIcon, TrashIcon } from '@lucide/svelte';
  import * as AlertDialog from './ui/alert-dialog';
  import { cn } from '../utils';

  const session = useSession() as unknown as Atom<{ data: Session }>;

  async function regenerateApiKey() {
    const keys = (await client.apiKey.list()).data ?? [];
    if (keys.length > 0) {
      for (const key of keys) await client.apiKey.delete({ keyId: key.id });
    }

    const name = `${$session.data?.user.username}-${Date.now()}`;
    const { data, error } = await client.apiKey.create({
      name,
      expiresIn: 60 * 60 * 24 * 7,
    });

    if (error) return toast.error(error.message ?? 'An unknown error occurred');
    toast.success("Don't share this key with anyone!", {
      description: data.key,
      action: {
        label: 'Copy',
        onClick: () => {
          navigator.clipboard.writeText(data?.key!);
          toast.success('Copied to clipboard', {
            action: {
              label: 'Close',
              onClick: () => toast.dismiss(),
            },
          });
        },
      },
    });
  }

  async function deleteAccount() {
    const { error } = await client.deleteUser();
    if (error) return toast.error(error.message ?? 'An unknown error occurred');
    window.location.href = '/';
    toast.success('Account deleted successfully!');
  }
</script>

<div class="mx-auto w-full max-w-screen-sm space-y-24 overflow-hidden py-16">
  <Field.Set>
    <Field.Legend class="font-semibold">Advanced settings</Field.Legend>
    <Field.Description>
      Advanced settings for accessing your account and data, please use with
      caution.
    </Field.Description>
    <Field.Separator />
    <Field.Group>
      <Field.Field orientation="responsive">
        <Field.Content>
          <Field.Label>API Key</Field.Label>
          <Field.Description>
            The API key generated here can be used to access our API remotely,
            please keep this secure and do not share it with anyone.<br /><br
            />Once you generate a new key, the old one will be revoked and you
            will need to update your clients to use the new key.
          </Field.Description>
        </Field.Content>
        <Button type="button" onclick={regenerateApiKey}>
          Generate a new key <KeyIcon class="size-4" />
        </Button>
      </Field.Field>
    </Field.Group>
  </Field.Set>
  <Field.Set>
    <Field.Legend class="text-destructive font-semibold"
      >Danger Zone</Field.Legend
    >
    <Field.Description>
      This is the danger zone. Where everything is irreversible, please be
      careful.
    </Field.Description>
    <Field.Separator />
    <Field.Group>
      <Field.Field orientation="responsive">
        <Field.Content>
          <Field.Label for="delete-account">Delete Account</Field.Label>
          <Field.Description>
            Permanently remove your account and all of its contents.
          </Field.Description>
        </Field.Content>
        <AlertDialog.Root>
          <AlertDialog.Trigger
            class={cn(
              buttonVariants({ variant: 'default' }),
              'border-destructive bg-destructive/25 text-destructive hover:bg-destructive/35 border'
            )}
          >
            <TrashIcon class="size-4" />
            Delete Account
          </AlertDialog.Trigger>
          <AlertDialog.Content>
            <AlertDialog.Header>
              <AlertDialog.Title>Are you sure?</AlertDialog.Title>
              <AlertDialog.Description>
                This action is irreversible and will permanently delete your
                account and all of its contents.
              </AlertDialog.Description>
            </AlertDialog.Header>
            <AlertDialog.Footer>
              <AlertDialog.Cancel>No, cancel</AlertDialog.Cancel>
              <AlertDialog.Action onclick={deleteAccount}
                >Yes, delete account</AlertDialog.Action
              >
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </Field.Field>
    </Field.Group>
  </Field.Set>
</div>
