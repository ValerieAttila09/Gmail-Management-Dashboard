import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

type MailComposeProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function MailCompose({ open, onOpenChange }: MailComposeProps) {
  const { toast } = useToast();

  const handleSend = () => {
    toast({
      title: "Email Sent",
      description: "Your message has been queued for sending.",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Message</DialogTitle>
          <DialogDescription>
            Compose a new email. Click send when you're ready.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="to" className="text-right">
              To
            </Label>
            <Input id="to" placeholder="recipient@example.com" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="subject" className="text-right">
              Subject
            </Label>
            <Input id="subject" placeholder="Subject" className="col-span-3" />
          </div>
          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="message">
              Message
            </Label>
            <Textarea id="message" placeholder="Type your message here." rows={6} />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSend}>Send</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
