"use client";
import {Cross2Icon} from '@radix-ui/react-icons';
import {Button, Dialog} from "@radix-ui/themes";

Anders.displayName = "Anders";

export default function Anders() {
    return (
        <Dialog.Root>
        <Dialog.Trigger>
          <Button className="Button violet">Edit profile</Button>
        </Dialog.Trigger>
          <Dialog.Content className="DialogContent">
            <Dialog.Title className="DialogTitle">Edit profile</Dialog.Title>
            <Dialog.Description className="DialogDescription">
              Make changes to your profile here. Click save when you're done.
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
              <Dialog.Close>
                <Button className="Button green">Save changes</Button>
              </Dialog.Close>
            </div>
            <Dialog.Close>
              <Button className="IconButton" aria-label="Close">
                <Cross2Icon />
              </Button>
            </Dialog.Close>
          </Dialog.Content>
      </Dialog.Root>

    )
}
