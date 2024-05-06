import { Button } from "@/Components/ui/button"
import {
  Dialog as D,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog"


const Dialog = ({ children, dialogTrigger, title, description, buttonLabel }) => {
  return (
    <D>
      {dialogTrigger}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
          <Button type="submit">{buttonLabel}</Button>
        </DialogFooter>
      </DialogContent>
    </D>
  )
}

export default Dialog;
