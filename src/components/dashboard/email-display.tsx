"use client";

import * as React from 'react';
import {
  Archive,
  ArchiveX,
  Clock,
  Forward,
  MoreVertical,
  Reply,
  ReplyAll,
  Trash2,
  FileText,
  Sparkles,
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import type { Mail } from '@/lib/types';
import { EmailList } from './email-list';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { placeholderImages } from '@/lib/placeholder-images.json';
import { suggestEmailTemplate } from '@/ai/flows/suggest-email-template';
import { useToast } from '@/hooks/use-toast';

interface EmailDisplayProps {
  mails: Mail[];
}

export function EmailDisplay({ mails }: EmailDisplayProps) {
  const [selectedMailId, setSelectedMailId] = React.useState<string | null>(
    mails.length > 0 ? mails[0].id : null
  );
  const [mailList, setMailList] = React.useState(mails);
  const { toast } = useToast();
  const [isReplying, setIsReplying] = React.useState(false);
  const [isLoadingTemplate, setIsLoadingTemplate] = React.useState(false);
  const replyTextRef = React.useRef<HTMLTextAreaElement>(null);
  const isDesktop = useIsMobile();
  
  const selectedMail = React.useMemo(() => mailList.find((m) => m.id === selectedMailId), [selectedMailId, mailList]);
  const userAvatar = placeholderImages.find((p) => p.id === 'user-avatar');

  const handleSelectMail = (id: string) => {
    setSelectedMailId(id);
    setIsReplying(false);
    setMailList(prev => prev.map(m => m.id === id ? {...m, read: true} : m));
  };
  
  const handleToggleRead = () => {
    if(!selectedMail) return;
    setMailList(prev => prev.map(m => m.id === selectedMail.id ? {...m, read: !m.read} : m));
  };

  const handleSuggestTemplate = async () => {
    if (!selectedMail) return;
    setIsLoadingTemplate(true);
    try {
      const result = await suggestEmailTemplate({
        recipient: selectedMail.email,
        recentMessages: [{ sender: selectedMail.email, content: selectedMail.text }],
      });
      if (replyTextRef.current) {
        replyTextRef.current.value = result.suggestedTemplate;
      }
    } catch (error) {
      console.error('Failed to suggest template:', error);
      toast({
        title: 'Error',
        description: 'Failed to suggest an email template.',
        variant: 'destructive',
      });
    } finally {
      setIsLoadingTemplate(false);
    }
  };
  
  const handleSendReply = () => {
    if (!replyTextRef.current?.value) return;
    toast({
        title: "Reply Sent",
        description: "Your message has been sent successfully."
    });
    setIsReplying(false);
  }

  return (
    <div className="flex h-full flex-col md:flex-row">
      <div className={cn('md:w-1/3 lg:w-1/4 border-r', !selectedMailId && 'w-full', isDesktop ? '' : (selectedMailId ? 'hidden' : ''))}>
        <EmailList mails={mailList} onSelectMail={handleSelectMail} selectedMailId={selectedMailId} />
      </div>

      <div className={cn('flex-1 flex flex-col', isDesktop ? '' : (selectedMailId ? '' : 'hidden'))}>
        {selectedMail ? (
          <>
            <div className="flex items-center p-2">
              <div className="flex items-center gap-2">
                 {!isDesktop && (
                  <Button variant="ghost" size="icon" onClick={() => setSelectedMailId(null)}>
                    <Reply className="h-4 w-4 rotate-180" />
                  </Button>
                )}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={handleToggleRead}>
                      <FileText className="h-4 w-4" />
                      <span className="sr-only">{selectedMail.read ? 'Mark as unread' : 'Mark as read'}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{selectedMail.read ? 'Mark as unread' : 'Mark as read'}</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Clock className="h-4 w-4" />
                      <span className="sr-only">Snooze</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Snooze</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Archive className="h-4 w-4" />
                      <span className="sr-only">Archive</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Archive</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Move to trash</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Move to trash</TooltipContent>
                </Tooltip>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">More</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setIsReplying(true)}>Reply</DropdownMenuItem>
                    <DropdownMenuItem>Forward</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <Separator />
            <div className="flex flex-1 flex-col">
              <div className="flex items-start p-4">
                <div className="flex items-start gap-4 text-sm">
                  <Avatar>
                    <AvatarFallback>{selectedMail.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="font-semibold">{selectedMail.name}</div>
                    <div className="line-clamp-1 text-xs">{selectedMail.subject}</div>
                    <div className="line-clamp-1 text-xs">
                      <span className="font-medium">Reply-To:</span> {selectedMail.email}
                    </div>
                  </div>
                </div>
                {selectedMail.date && (
                  <div className="ml-auto text-xs text-muted-foreground">
                    {new Date(selectedMail.date).toLocaleDateString()}
                  </div>
                )}
              </div>
              <Separator />
              <div className="flex-1 whitespace-pre-wrap p-4 text-sm">{selectedMail.text}</div>
              <Separator className="mt-auto" />
              {isReplying ? (
                 <div className="p-4">
                    <div className="grid gap-4">
                        <Label htmlFor="message-2">Reply</Label>
                        <Textarea id="message-2" placeholder="Type your message here." ref={replyTextRef} />
                        <div className="flex items-center">
                            <Button onClick={handleSendReply}>Send</Button>
                             <Button
                                variant="ghost"
                                onClick={handleSuggestTemplate}
                                disabled={isLoadingTemplate}
                                className="ml-auto"
                            >
                                {isLoadingTemplate ? 'Generating...' : <><Sparkles className="mr-2 h-4 w-4" /> Suggest Template</>}
                            </Button>
                        </div>
                    </div>
                 </div>
              ) : (
                <div className="p-4">
                    <form>
                    <div className="grid gap-4">
                        <div className="flex gap-2">
                        <Button onClick={() => setIsReplying(true)} variant="outline">
                            <Reply className="mr-2 h-4 w-4" />
                            Reply
                        </Button>
                        <Button onClick={() => setIsReplying(true)} variant="outline">
                            <ReplyAll className="mr-2 h-4 w-4" />
                            Reply All
                        </Button>
                        <Button onClick={() => setIsReplying(true)} variant="outline">
                            <Forward className="mr-2 h-4 w-4" />
                            Forward
                        </Button>
                        </div>
                    </div>
                    </form>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="p-4 text-center text-muted-foreground">No message selected</div>
        )}
      </div>
    </div>
  );
}
