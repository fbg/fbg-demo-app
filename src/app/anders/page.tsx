"use client";
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import '@/app/css/radix.css';
import '@radix-ui/themes/styles.css';



Anders.displayName = "Anders";

export default function Anders() {
    return (
        <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className="Button violet">Edit profile</button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent">
            <Dialog.Title className="DialogTitle">Edit profile</Dialog.Title>
            <Dialog.Description className="DialogDescription">
              Make changes to your profile here. Click save when you&apos;re done.
            </Dialog.Description>
            <fieldset className="Fieldset">
              <label className="Label" htmlFor="name">
                Name
              </label>
              <input className="Input" id="name" defaultValue="Pedro Duarte" />
            </fieldset>
            <fieldset className="Fieldset">
              <label className="Label" htmlFor="username">
                Username
              </label>
              <input className="Input" id="username" defaultValue="@peduarte" />
            </fieldset>
            <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
              <Dialog.Close asChild>
                <button className="Button green">Save changes</button>
              </Dialog.Close>
            </div>
            <Dialog.Close asChild>
              <button className="IconButton" aria-label="Close">
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    
    )
}