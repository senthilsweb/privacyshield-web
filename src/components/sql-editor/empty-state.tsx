'use client';

import React from 'react';
import { Database, Table2, Code2, Terminal, LineChart } from 'lucide-react';
import { Card } from '@/components/ui/card';

const EmptyState = () => {
  return (
    <Card className="p-8">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="relative">
          <Database className="h-24 w-24 text-primary/20" />
          <div className="absolute -right-12 -top-4">
            <Table2 className="h-12 w-12 text-primary/40" />
          </div>
          <div className="absolute -left-12 top-8">
            <Code2 className="h-16 w-16 text-primary/30" />
          </div>
          <div className="absolute -right-8 bottom-0">
            <Terminal className="h-14 w-14 text-primary/25" />
          </div>
          <div className="absolute -left-8 -bottom-4">
            <LineChart className="h-10 w-10 text-primary/35" />
          </div>
        </div>
        <div className="max-w-md space-y-2">
          <h3 className="text-lg font-semibold">
            Ready to explore your data?
          </h3>
          <p className="text-sm text-muted-foreground">
            Enter a SQL query above and click Run to see your results.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default EmptyState;