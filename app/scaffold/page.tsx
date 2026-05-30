'use client'

import React, { useState } from 'react'
import { useProjectStore } from '@/store/useProjectStore'
import { generateProjectContext, generateMarkdownContext } from '@/lib/generator'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Trash2, Download, Clipboard, Check, ChevronRight, ChevronLeft } from 'lucide-react'

export default function ScaffoldPage() {
  const [step, setStep] = useState(1)
  const store = useProjectStore()
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    const context = generateMarkdownContext(store)
    navigator.clipboard.writeText(context)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const context = generateProjectContext(store)
    const blob = new Blob([JSON.stringify(context, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'project-context.json'
    a.click()
  }

  const nextStep = () => setStep(s => Math.min(s + 1, 5))
  const prevStep = () => setStep(s => Math.max(s - 1, 1))

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Scaffolding Hub</h1>
        <p className="mt-2 text-zinc-500 dark:text-zinc-400">
          Design your project blueprint and generate AI-ready context.
        </p>
      </div>

      <div className="mb-8 flex items-center gap-4">
        {[1, 2, 3, 4, 5].map((s) => (
          <React.Fragment key={s}>
            <div 
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                step >= s ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-zinc-200 text-zinc-500 dark:bg-zinc-800'
              }`}
            >
              {s}
            </div>
            {s < 5 && <div className={`h-px flex-1 ${step > s ? 'bg-black dark:bg-white' : 'bg-zinc-200 dark:bg-zinc-800'}`} />}
          </React.Fragment>
        ))}
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Project Metadata</h2>
            <div className="grid gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Project Name</label>
                <Input value={store.name} onChange={(e) => store.setName(e.target.value)} placeholder="e.g. My Awesome App" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Project Type</label>
                <Input value={store.type} onChange={(e) => store.setType(e.target.value)} placeholder="e.g. Mobile Application, Web Dashboard" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Architecture</label>
                <Input value={store.architecture} onChange={(e) => store.setArchitecture(e.target.value)} placeholder="e.g. Clean Architecture, Modular" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea 
                  className="flex min-h-[100px] w-full rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 dark:border-zinc-800"
                  value={store.description} 
                  onChange={(e) => store.setDescription(e.target.value)}
                  placeholder="What is this project about?"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Tech Stack</h2>
            <div className="grid gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Frontend Framework</label>
                <Input value={store.techStack.frontend} onChange={(e) => store.setStack({ frontend: e.target.value })} placeholder="e.g. Flutter, Next.js" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Programming Language</label>
                <Input value={store.techStack.language} onChange={(e) => store.setStack({ language: e.target.value })} placeholder="e.g. Dart, TypeScript" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Database Driver / Cloud</label>
                <Input value={store.techStack.database_driver} onChange={(e) => store.setStack({ database_driver: e.target.value })} placeholder="e.g. Supabase, Firebase" />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Database Blueprint</h2>
              <Button size="sm" onClick={() => store.addTable({ name: 'new_table', columns: [] })}>
                <Plus className="mr-2 h-4 w-4" /> Add Table
              </Button>
            </div>
            
            <div className="space-y-4">
              {store.databaseBlueprint.tables.map((table, tIdx) => (
                <div key={tIdx} className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
                  <div className="mb-4 flex items-center justify-between">
                    <Input 
                      className="max-w-[200px] font-semibold"
                      value={table.name} 
                      onChange={(e) => {
                        const newTables = [...store.databaseBlueprint.tables]
                        newTables[tIdx].name = e.target.value
                        useProjectStore.setState({ databaseBlueprint: { tables: newTables } })
                      }}
                    />
                    <Button variant="ghost" size="sm" onClick={() => store.removeTable(table.name)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {table.columns.map((col, cIdx) => (
                      <div key={cIdx} className="flex gap-2">
                        <Input 
                          placeholder="Column Name"
                          value={col.name}
                          onChange={(e) => {
                            const newTables = [...store.databaseBlueprint.tables]
                            newTables[tIdx].columns[cIdx].name = e.target.value
                            useProjectStore.setState({ databaseBlueprint: { tables: newTables } })
                          }}
                        />
                        <Input 
                          placeholder="Type"
                          value={col.type}
                          onChange={(e) => {
                            const newTables = [...store.databaseBlueprint.tables]
                            newTables[tIdx].columns[cIdx].type = e.target.value
                            useProjectStore.setState({ databaseBlueprint: { tables: newTables } })
                          }}
                        />
                      </div>
                    ))}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => {
                        const newTables = [...store.databaseBlueprint.tables]
                        newTables[tIdx].columns.push({ name: '', type: '' })
                        useProjectStore.setState({ databaseBlueprint: { tables: newTables } })
                      }}
                    >
                      Add Column
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">AI Coding Rules & Commands</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Coding Rules</label>
                {store.strictCodingRules.map((rule, idx) => (
                  <div key={idx} className="flex gap-2">
                    <Input value={rule} onChange={(e) => {
                      const newRules = [...store.strictCodingRules]
                      newRules[idx] = e.target.value
                      useProjectStore.setState({ strictCodingRules: newRules })
                    }} />
                    <Button variant="ghost" size="sm" onClick={() => store.removeRule(idx)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => store.addRule('')} className="w-full">
                  Add Rule
                </Button>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Init Commands</label>
                {store.initializationCommandList.map((cmd, idx) => (
                  <div key={idx} className="flex gap-2">
                    <Input value={cmd} onChange={(e) => {
                      const newCmds = [...store.initializationCommandList]
                      newCmds[idx] = e.target.value
                      useProjectStore.setState({ initializationCommandList: newCmds })
                    }} />
                    <Button variant="ghost" size="sm" onClick={() => store.removeCommand(idx)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => store.addCommand('')} className="w-full">
                  Add Command
                </Button>
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Review & Export</h2>
            <div className="rounded-lg bg-zinc-50 p-4 font-mono text-xs dark:bg-zinc-950">
              <pre>{JSON.stringify(generateProjectContext(store), null, 2)}</pre>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button className="flex-1" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" /> Download JSON
              </Button>
              <Button variant="secondary" className="flex-1" onClick={handleCopy}>
                {copied ? <Check className="mr-2 h-4 w-4" /> : <Clipboard className="mr-2 h-4 w-4" />}
                {copied ? 'Copied Markdown' : 'Copy Markdown'}
              </Button>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-between border-t border-zinc-200 pt-6 dark:border-zinc-800">
          <Button variant="ghost" onClick={prevStep} disabled={step === 1}>
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <Button onClick={nextStep} disabled={step === 5}>
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
