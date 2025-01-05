
"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import YAML from 'yaml'
import PipelineDiagram from '@/components/data-pipeline-diagram/pipeline-diagram'
import Editor from '@/components/data-pipeline-diagram/editor'

const defaultYaml = `title: Data Flow Architecture
description: ETL pipeline from source databases to analytics
nodes:
  - id: pg01
    name: PostgreSQL
    description: OLTP app DB
    icon: logos:postgresql
    color: bg-blue-500
    show_annotation: false
  - id: sql01
    name: SQL Server
    description: Legacy data source
    icon: simple-icons:microsoftsqlserver
    color: bg-red-500
    show_annotation: false
  - id: s3l01
    name: S3 Landing
    description: Landing zone in Data lake with raw data
    icon: logos:aws-s3
    color: bg-orange-500
    show_annotation: false
  - id: s3c01
    name: S3 Curated
    description: Cleansed and active data
    icon: logos:aws-s3
    color: bg-green-500
    show_annotation: false
  - id: adb01
    name: Analytics DB
    description: Data warehouse for PowerBI and Table reports
    icon: carbon:analytics
    color: bg-purple-500
    show_annotation: false
edges:
  - source: pg01
    target: s3l01
    animated: true
  - source: sql01
    target: s3l01
    animated: true
  - source: s3l01
    target: s3c01
    animated: false
  - source: s3c01
    target: adb01
    animated: false`.trim()

export default function Home() {
    const [yamlInput, setYamlInput] = useState(defaultYaml)
    const [pipelineData, setPipelineData] = useState(null)
    const { toast } = useToast()

  const handleRender = () => {
    try {
      const parsed = YAML.parse(yamlInput)
      setPipelineData(parsed)
    } catch (err) {
      toast({
        variant: "destructive",
        title: "YAML Parse Error",
        description: err.message,
      })
    }
  }

  const handleTidy = () => {
    try {
      const parsed = YAML.parse(yamlInput)
      const tidied = YAML.stringify(parsed, {
        indent: 2,
        lineWidth: 0,
      })
      setYamlInput(tidied)
    } catch (err) {
      toast({
        variant: "destructive",
        title: "YAML Parse Error",
        description: "Unable to tidy invalid YAML",
      })
    }
  }

  return (
    <div className="container mx-auto p-4 h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Data Pipeline Visualizer</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
        <Card className="flex flex-col">
          <CardHeader className="border-b">
            <CardTitle>YAML Input</CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex-grow">
            <Editor
              value={yamlInput}
              onChange={setYamlInput}
              onRender={handleRender}
              onTidy={handleTidy}
            />
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader className="border-b">
            <CardTitle>Pipeline Diagram</CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex-grow">
            {pipelineData ? (
              <PipelineDiagram data={pipelineData} />
            ) : (
              <p className="p-4">Enter YAML and click Render to see the diagram</p>
            )}
          </CardContent>
        </Card>
      </div>
      <Toaster />
    </div>
  )
}