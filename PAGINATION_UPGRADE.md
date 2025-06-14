# Enhanced Pagination Component

## Overview

The enhanced Pagination component now includes jump navigation buttons (+10/-10) to handle scenarios with many pages more efficiently.

## How Button Creation Works

### Current Implementation

#### 1. Table Row Creation
In the Table component (`src/components/Table/index.tsx`), table rows are created using:

```tsx
<TableBody>
  {rows.map((row, idx) => {
    const rowKey = `${row[rowKeyIndex].value.toString()}-${idx}-table`;
    return (
      <TableRow key={rowKey}>
        {/* Row content */}
      </TableRow>
    );
  })}
</TableBody>
```

#### 2. Pagination Button Creation
The Pagination component creates buttons using the `PaginationButton` wrapper:

```tsx
const PaginationButton: React.FC<PaginationButtonProps> = ({ 
  className, 
  onClick, 
  children, 
  variant = 'text',
  small = false 
}) => {
  const styles = useStyles();
  return (
    <Button 
      variant={variant} 
      css={styles.button} 
      className={className} 
      onClick={onClick}
      small={small}
    >
      {children}
    </Button>
  );
};
```

## New Features

### Jump Navigation Buttons

The enhanced pagination now includes:

1. **-10 Button**: Jumps backward by 10 pages (or custom `jumpStep`)
2. **+10 Button**: Jumps forward by 10 pages (or custom `jumpStep`)

### New Props

```tsx
interface PaginationProps {
  // ...existing props...
  showJumpButtons?: boolean; // Enable/disable jump buttons (default: true)
  jumpStep?: number;         // Number of pages to jump (default: 10)
}
```

### Usage Examples

#### Basic Usage (with default +10/-10 buttons)
```tsx
<Pagination
  itemsCount={1000}
  onChange={handlePageChange}
  itemsPerPageCount={20}
/>
```

#### Custom Jump Step
```tsx
<Pagination
  itemsCount={1000}
  onChange={handlePageChange}
  itemsPerPageCount={20}
  jumpStep={5}  // Creates -5/+5 buttons instead
/>
```

#### Disable Jump Buttons
```tsx
<Pagination
  itemsCount={100}
  onChange={handlePageChange}
  itemsPerPageCount={20}
  showJumpButtons={false}  // No jump buttons shown
/>
```

## Button Layout Order

The new pagination layout follows this order:

1. **Items count** (e.g., "1-20 of 500")
2. **Previous page arrow** (◀)
3. **Jump backward** (-10)
4. **Page numbers** (1, 2, 3, 4...)
5. **Jump forward** (+10)
6. **Next page arrow** (▶)

## Smart Visibility

Jump buttons are automatically hidden when:
- `showJumpButtons` is `false`
- Total pages ≤ jumpStep * 2 (not enough pages to justify jump buttons)
- User is too close to start/end to jump (prevents invalid navigation)

## Benefits

1. **Better UX**: Users can quickly navigate large datasets
2. **Configurable**: Jump step can be customized per use case
3. **Smart**: Buttons only appear when useful
4. **Backward Compatible**: Existing pagination usage continues to work

## Implementation Details

The jump functionality uses these helper functions:

```tsx
const canJumpBackward = activePageIndex >= jumpStep;
const canJumpForward = activePageIndex < pagesCount - jumpStep;

const handleJumpBackward = () => {
  const newPageIndex = Math.max(0, activePageIndex - jumpStep);
  goToPageByIndex(newPageIndex);
};

const handleJumpForward = () => {
  const newPageIndex = Math.min(pagesCount - 1, activePageIndex + jumpStep);
  goToPageByIndex(newPageIndex);
};
```

This ensures users never navigate to invalid page indices.
