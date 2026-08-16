import type { Media, User } from '@/payload-types'
import { RequiredDataFromCollectionSlug } from 'payload'
import {
  bannerBlock,
  boldParagraph,
  buildRichText,
  bulletList,
  codeBlock,
  heading,
  mediaBlock,
  paragraph,
} from './richTextHelpers'

export type PostArgs = {
  heroImage: Media
  blockImage: Media
  author: User
}

export const post3: (args: PostArgs) => RequiredDataFromCollectionSlug<'insights'> = ({
  heroImage,
  blockImage,
  author,
}) => {
  return {
    slug: 'double-entry-ledger-for-software-engineers',
    _status: 'published',
    authors: [author],
    topic: 'Architecture',
    readTime: '8 min read',
    tags: [
      { tag: 'payments' },
      { tag: 'architecture' },
      { tag: 'postgres' },
      { tag: 'reliability' },
    ],
    content: buildRichText([
      paragraph(
        'Most bugs in a fintech product are not payment bugs. They are accounting bugs wearing a payment bug\u2019s clothes — a balance that drifts, a refund that double-counts, a report that never quite reconciles. The fix predates software by centuries: double-entry bookkeeping.',
      ),
      heading('The core idea, for engineers', 'h2'),
      paragraph(
        'Every transaction is recorded as two or more entries that net to zero: a debit somewhere is always matched by a credit somewhere else. A user\u2019s wallet balance is never a mutable integer you increment and decrement — it is a derived value, computed by summing the ledger entries that reference that account. The balance is a read model, not a source of truth.',
      ),
      codeBlock(
        `-- one transaction, two entries, always balanced\nINSERT INTO ledger_entries (transaction_id, account_id, amount, entry_type) VALUES\n  ('txn_8f2c', 'acct_user_wallet', -4000, 'debit'),\n  ('txn_8f2c', 'acct_platform_revenue', 4000, 'credit');\n\n-- balance is always derived, never stored and mutated directly\nSELECT account_id, SUM(amount) AS balance\nFROM ledger_entries\nWHERE account_id = 'acct_user_wallet'\nGROUP BY account_id;`,
        'sql',
        'Minimal double-entry schema',
      ),
      heading('Why this matters more once an agent is involved', 'h2'),
      paragraph(
        'A mutable "balance" column tempts every caller — human or agent — into a read-modify-write race condition: read the balance, compute a new value, write it back. Under concurrent load, or when an agent retries a call, that pattern loses updates silently. A ledger of immutable entries has no race condition to lose, because nothing is ever overwritten. Every entry is an insert, never an update.',
      ),
      bulletList([
        'Balances are always recomputed from entries, never stored as a mutable counter',
        'Every entry is immutable once written — corrections are new offsetting entries, not edits',
        'Every transaction ties two or more entries together and must net to zero',
        'Reconciliation becomes a query, not a manual audit',
      ]),
      bannerBlock(
        'If you find yourself writing `UPDATE accounts SET balance = balance - 4000`, stop. That statement is exactly the shape of bug that a ledger design eliminates by construction.',
        'warning',
        'Anti-pattern to avoid',
      ),
      mediaBlock(blockImage.id),
      heading('What this buys you operationally', 'h2'),
      paragraph(
        'Beyond correctness, an entry-based ledger gives you a complete, queryable history for free. When support asks "why does this user\u2019s balance look wrong," the answer is always a SQL query against immutable rows, not a forensic investigation into which service touched a mutable column last Tuesday.',
      ),
      boldParagraph(
        'The takeaway: ',
        'if your product moves money, the ledger is not an implementation detail of the payments feature. It is the data model the rest of the system should be built around.',
      ),
    ]),
    heroImage: heroImage.id,
    meta: {
      description:
        'Why a mutable balance column is the wrong data model for any product that moves money, and how double-entry bookkeeping eliminates an entire category of race conditions.',
      image: heroImage.id,
      title: 'The Double-Entry Ledger, Explained for Software Engineers',
    },
    relatedPosts: [], // this is populated by the seed script
    title: 'The Double-Entry Ledger, Explained for Software Engineers',
  }
}
