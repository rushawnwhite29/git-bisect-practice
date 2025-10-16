# Git Bisect Guide for This Project

## The Bug

This project contains a bug that was introduced in **commit 15** (commit message: "Refactor button handlers for better organization").

**Bug Description**: When you click the equals (=) button to calculate a result, the calculator clears instead of performing the calculation.

## The Last Working Commit

**Commit 14** (commit message: "Add final styling and README - Working calculator app") is the last commit where the calculator works correctly.

## How to Find the Bug Using Git Bisect

### Step 1: Start Git Bisect

```bash
git bisect start
```

### Step 2: Mark the Current State as Bad

Since we know the current HEAD has the bug:

```bash
git bisect bad HEAD
```

### Step 3: Mark an Early Commit as Good

We know the first commit didn't have the bug (there wasn't even a frontend yet!):

```bash
git bisect good 446bc36
```

Or you can use a commit you know worked, like commit 14:

```bash
git bisect good e60a8b6
```

### Step 4: Test Each Commit

Git bisect will check out a commit in the middle of the range. For each commit:

1. **If the frontend exists**, start the app:
   ```bash
   cd frontend
   npm install  # only needed once
   npm run dev
   ```

2. **Test the calculator**:
   - Enter a number (e.g., 5)
   - Click an operation (e.g., +)
   - Enter another number (e.g., 3)
   - Click the = button
   
3. **Determine if it's good or bad**:
   - If it calculates correctly (shows 8), mark as good: `git bisect good`
   - If it clears the display instead, mark as bad: `git bisect bad`
   - If there's no frontend yet, mark as good: `git bisect good`

### Step 5: Git Bisect Will Find the Culprit

After a few iterations (typically about 4-5 tests), git bisect will identify commit 15 as the first bad commit.

### Step 6: Reset When Done

```bash
git bisect reset
```

## The Bug Details

In commit 15, in the file `frontend/src/App.jsx`, line 89, the equals button handler was changed from:

```jsx
<button className="btn btn-equals" onClick={handleCalculate}>=</button>
```

to:

```jsx
<button className="btn btn-equals" onClick={handleClear}>=</button>
```

This subtle change caused the equals button to call `handleClear` instead of `handleCalculate`, making it clear the display instead of performing the calculation.

## How to Fix the Bug After Finding It

Once git bisect identifies the problematic commit, here's how to fix it:

### Step 1: Examine the Bad Commit

After `git bisect` identifies commit `ffbe847`, examine what changed:

```bash
git bisect reset  # First, return to your normal state
git show ffbe847  # View the changes in the bad commit
```

Or use:

```bash
git diff ffbe847^..ffbe847  # Compare the commit with its parent
```

### Step 2: Choose Your Fix Strategy

You have several options:

#### Option A: Create a New Fix Commit (Recommended for shared branches)

This is the safest approach when working on a shared branch:

```bash
# Make sure you're on the main branch
git checkout master

# Edit the file to fix the bug
# In frontend/src/App.jsx, change line with the equals button from:
#   onClick={handleClear}
# to:
#   onClick={handleCalculate}

# Commit the fix
git add frontend/src/App.jsx
git commit -m "Fix: Restore calculate functionality to equals button"
```

#### Option B: Revert the Bad Commit

If you want to undo the entire commit:

```bash
git revert ffbe847
```

This creates a new commit that reverses the changes from the bad commit.

#### Option C: Interactive Rebase (Advanced - only for local/unpushed commits)

If the commits haven't been pushed or shared with others, you can rewrite history:

```bash
git rebase -i e60a8b6  # Interactive rebase from the last good commit

# In the editor that opens, change 'pick' to 'edit' for commit ffbe847
# Save and close the editor

# Git will stop at that commit - now fix the bug
# Edit frontend/src/App.jsx to change onClick={handleClear} to onClick={handleCalculate}

git add frontend/src/App.jsx
git rebase --continue
```

### Step 3: The Specific Fix for This Bug

Edit `frontend/src/App.jsx` and find the equals button (should be around line 157-160):

**Before (buggy):**
```jsx
<button className="btn btn-equals" onClick={handleClear}>=</button>
```

**After (fixed):**
```jsx
<button className="btn btn-equals" onClick={handleCalculate}>=</button>
```

### Step 4: Verify the Fix

After making the fix:

```bash
cd frontend
npm run dev
```

Test the calculator:
1. Enter a number (e.g., 5)
2. Click an operation (e.g., +)
3. Enter another number (e.g., 3)
4. Click the = button
5. Verify it shows the result (8) instead of clearing

### Step 5: Understand Why This Happened

Looking at the commit message "Refactor button handlers for better organization", it appears someone was reorganizing code and accidentally changed the wrong handler. This is a common type of bug that can slip through code review.

**Prevention tips:**
- Write unit tests for critical functionality
- Use TypeScript for better type safety
- Do thorough code reviews, especially for "simple refactoring"
- Test manually before committing

## Commit History Summary

- **Commits 1-6**: Backend development (Spring Boot, calculator service, REST API)
- **Commits 7-11**: Frontend setup and basic UI (React, Vite, calculator components)
- **Commits 12-14**: Complete the calculator with all operations (working app ✓)
- **Commit 15**: **BUG INTRODUCED** - Equals button breaks ✗
- **Commits 16-20**: Additional features (decimal support, keyboard, error handling, docs) with bug still present ✗

## Expected Git Bisect Steps

When using `git bisect good 446bc36` (first commit):

1. Git checks out commit ~10 (middle of the range)
2. You test and mark it good/bad
3. Git checks out commit ~5 or ~15 (depending on your answer)
4. Continue testing
5. After 4-5 tests, git identifies commit 15 as the culprit

## Practice Tips

1. **Use commit 14 as your known good**: This makes bisect faster since you're certain it works
2. **Automate testing**: For more advanced practice, you could write a test script and use `git bisect run`
3. **Reset and try again**: Practice makes perfect! Reset and try bisecting multiple times to get comfortable

## Learning Objectives

- Understand how git bisect uses binary search to find bugs efficiently
- Learn to mark commits as good or bad based on testing
- Appreciate the importance of small, incremental commits
- See how commit messages help during debugging

