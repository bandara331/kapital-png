const fs = require('fs');

function replaceInFile(filePath, regex, replacement) {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    fs.writeFileSync(filePath, content.replace(regex, replacement), 'utf8');
  }
}

// 1. ActivityFeed.tsx
replaceInFile('src/components/admin/ActivityFeed.tsx', /clientsData\.forEach\(c =>/g, 'clientsData.forEach((c: any) =>');
replaceInFile('src/components/admin/ActivityFeed.tsx', /docsData\.forEach\(d =>/g, 'docsData.forEach((d: any) =>');
replaceInFile('src/components/admin/ActivityFeed.tsx', /msgsData\.forEach\(m =>/g, 'msgsData.forEach((m: any) =>');

// 2. AdminInbox.tsx
replaceInFile('src/components/admin/AdminInbox.tsx', /clientsData\.forEach\(c =>/g, 'clientsData.forEach((c: any) =>');
replaceInFile('src/components/admin/AdminInbox.tsx', /\(payload\) => \{/g, '(payload: any) => {');

// 3. DocumentVault.tsx
replaceInFile('src/components/admin/DocumentVault.tsx', /clientsData\.forEach\(c =>/g, 'clientsData.forEach((c: any) =>');
replaceInFile('src/components/admin/DocumentVault.tsx', /docsData\.forEach\(doc =>/g, 'docsData.forEach((doc: any) =>');

// 4. ClientInbox.tsx
replaceInFile('src/components/dashboard/ClientInbox.tsx', /\(payload\) => \{/g, '(payload: any) => {');

// 5. ContactForm.tsx
replaceInFile('src/components/sections/ContactForm.tsx', /supabase\.auth\.getSession\(\)\.then\(\(\{\s*data:\s*\{\s*session\s*\}\s*\}\)\s*=>/g, 'supabase.auth.getSession().then(({ data: { session } }: any) =>');
replaceInFile('src/components/sections/ContactForm.tsx', /supabase\.auth\.onAuthStateChange\(\(_e,\s*s\)\s*=>/g, 'supabase.auth.onAuthStateChange((_e: any, s: any) =>');

// 6. DashboardDemo.tsx
replaceInFile('src/components/sections/DashboardDemo.tsx', /\.map\(d =>/g, '.map((d: any) =>');
replaceInFile('src/components/sections/DashboardDemo.tsx', /\.filter\(d =>/g, '.filter((d: any) =>');
replaceInFile('src/components/sections/DashboardDemo.tsx', /docs\.some\(d =>/g, 'docs.some((d: any) =>');

// 7. Navbar.tsx
replaceInFile('src/components/ui/Navbar.tsx', /supabase\.auth\.getSession\(\)\.then\(\(\{\s*data:\s*\{\s*session\s*\}\s*\}\)\s*=>/g, 'supabase.auth.getSession().then(({ data: { session } }: any) =>');
replaceInFile('src/components/ui/Navbar.tsx', /supabase\.auth\.onAuthStateChange\(\(_e,\s*s\)\s*=>/g, 'supabase.auth.onAuthStateChange((_e: any, s: any) =>');

console.log('Fixed TS errors!');
