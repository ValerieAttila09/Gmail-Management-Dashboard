"use client";

import { cn } from '@/lib/utils';
import type { Mail } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface EmailListProps {
  mails: Mail[];
  onSelectMail: (id: string) => void;
  selectedMailId: string | null;
}

export function EmailList({ mails, onSelectMail, selectedMailId }: EmailListProps) {
  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {mails.map((mail) => (
          <button
            key={mail.id}
            className={cn(
              'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent',
              selectedMailId === mail.id && 'bg-accent'
            )}
            onClick={() => onSelectMail(mail.id)}
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className={cn('font-semibold', !mail.read && 'font-bold')}>
                    {mail.name}
                  </div>
                  {!mail.read && (
                    <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <div
                  className={cn(
                    'ml-auto text-xs',
                    selectedMailId === mail.id
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  {new Date(mail.date).toLocaleDateString()}
                </div>
              </div>
              <div className={cn('text-xs font-medium', !mail.read && 'font-semibold')}>
                {mail.subject}
              </div>
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              {mail.text.substring(0, 300)}
            </div>
            <div className="flex items-center gap-2">
              {mail.category && (
                <Badge
                  variant={getBadgeVariantFromCategory(mail.category)}
                  className="capitalize"
                >
                  {mail.category}
                </Badge>
              )}
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}

function getBadgeVariantFromCategory(
  category: Mail['category']
): 'default' | 'secondary' | 'destructive' | 'outline' {
  if (['promotions', 'deals'].includes(category as string)) {
    return 'outline';
  }
  
  if (['social', 'forums'].includes(category as string)) {
    return 'secondary';
  }

  return 'default';
}
