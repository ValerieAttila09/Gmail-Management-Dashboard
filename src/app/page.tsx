import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { MainNav } from '@/components/dashboard/main-nav';
import { UserNav } from '@/components/dashboard/user-nav';
import { EmailDisplay } from '@/components/dashboard/email-display';
import { mails as defaultMails } from '@/lib/data';
import type { Mail } from '@/lib/types';
import { categorizeEmail } from '@/ai/flows/categorize-emails-by-topic';

export default async function Home() {
  const mails: Mail[] = await Promise.all(
    defaultMails.map(async (mail) => {
      try {
        const { category } = await categorizeEmail({
          subject: mail.subject,
          body: mail.text,
        });
        return { ...mail, category: category };
      } catch (error) {
        console.error('Failed to categorize email:', error);
        // Fallback to a default category if AI fails
        return { ...mail, category: 'primary' as const };
      }
    })
  );

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-6 text-primary"
              >
                <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                <path d="M19 16.5v-1.5a2.5 2.5 0 0 1 5 0v1.5" />
                <path d="M19 22v-1.5" />
                <path d="M24 19h-2.5" />
                <path d="M16.5 19H14" />
                <path d="m21.5 19.5-1-1" />
                <path d="m17 19.5 1-1" />
              </svg>
              <h1 className="text-xl font-semibold">MailZen</h1>
            </div>
          </SidebarHeader>
          <SidebarContent className="p-2">
            <MainNav />
          </SidebarContent>
        </Sidebar>
        <SidebarInset className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
            <SidebarTrigger className="md:hidden" />
            <div className="w-full flex-1">
              <form>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search emails..."
                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                  />
                </div>
              </form>
            </div>
            <UserNav />
          </header>
          <main className="flex flex-1 flex-col gap-4 p-0 lg:gap-6 lg:p-0">
            <EmailDisplay mails={mails} />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
