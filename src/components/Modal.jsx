import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

export function Modal({ title, children, hasFooter, setShowModal }) {
  return (
    <Dialog open>
      <DialogContent className="w-1/2 h-1/2">
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          <DialogDescription>Hallo{children}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
