---
name: Bug report
about: Create a report to help us improve
title: "[BUG]"
labels: bug
assignees: ''

---

**Component Name**

**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Props that are passed into the component:
```
data = [
  { name: 'Alice', dateOfBirth: '1999/09/23', bestFriend: 'Bob', age: 20 },
  ...
]

<DataTable data={data} download={false}>
  <DataTable.Column
    name='Name'
    dataKey='name'
  />
  <DataTable.Column
    name='Age'
    dataKey='age'
  />
</DataTable>
```
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. Search '...'
5. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment (please complete the following information):**
 - OS: [e.g. Windows 10, macOS Mojave]
 - Browser [e.g. chrome, safari, firefox]
 - Version [e.g. 22]
 - React Version [e.g. 15.6]

**Additional context**
Add any other context about the problem here.
