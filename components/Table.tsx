'use client';

import React, { useState } from 'react';
import styled from 'styled-components';

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  font-family: Arial, sans-serif;
  margin-top: 20px;

  th, td {
    border: 1px solid #000;
    padding: 10px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
    font-weight: bold;
  }

  .total-score-row {
    background-color: #f2f2f2;
    font-weight: bold;
  }

  select {
    width: 100%;
    padding: 6px;
    font-size: 1em;
  }
`;

interface TableData {
  section: string;
  criteria: string;
  ratio: string;
  evaluation: string | number;
  score: string | number;
}

const Table: React.FC = () => {
  const [tableData, setTableData] = useState<TableData[]>([
    { section: "COMPETITIVENESS", criteria: "Price competitiveness on tenders", ratio: "17%", evaluation: 0, score: 0 },
    { section: "COMPETITIVENESS", criteria: "Innovative cost optimization solutions", ratio: "9%", evaluation: 0, score: 0 },
    { section: "COMPETITIVENESS", criteria: "Pricing transparency", ratio: "9%", evaluation: 0, score: 0 },
    { section: "COMPETITIVENESS", criteria: "Payment terms", ratio: "16%", evaluation: 0, score: 0 },
    { section: "COMPETITIVENESS", criteria: "Supplier shares info about innovation, new trends, ideas and solutions", ratio: "N/A", evaluation: "N/A", score: "N/A" },
    { section: "COMPETITIVENESS", criteria: "Risk Management: cyber security", ratio: "6%", evaluation: 0, score: 0 },
    { section: "COMPETITIVENESS", criteria: "Vendor Management Inventory", ratio: "6%", evaluation: 0, score: 0 },
    { section: "FLEXIBILITY", criteria: "Lead times", ratio: "12%", evaluation: 0, score: 0 },
    { section: "FLEXIBILITY", criteria: "Reaction in crisis", ratio: "N/A", evaluation: "N/A", score: "N/A" },
    { section: "FLEXIBILITY", criteria: "Responsiveness to requests", ratio: "N/A", evaluation: "N/A", score: "N/A" },
    { section: "STABILITY", criteria: "BCP", ratio: "14%", evaluation: 0, score: 0 },
    { section: "STABILITY", criteria: "Contract", ratio: "N/A", evaluation: "N/A", score: "N/A" },
    { section: "STABILITY", criteria: "Financial Health", ratio: "8%", evaluation: "N/A", score: "N/A" },
    { section: "SPECIFICS", criteria: "Key Account Manager Support", ratio: "N/A", evaluation: "N/A", score: "N/A" },
  ]);

  const handleEvaluationChange = (index: number, newValue: string | number) => {
    setTableData((prevData) => {
      const updatedData = [...prevData];
      const selectedRow = updatedData[index];

      if (newValue === "N/A" && selectedRow.ratio !== "N/A") {
        const removedRatio = parseFloat(selectedRow.ratio) || 0;
        const remainingRows = updatedData.filter((row, i) => i !== index && row.ratio !== "N/A");
        const totalRemainingWeight = remainingRows.reduce((sum, row) => sum + parseFloat(row.ratio || "0"), 0);

        const scalingFactor = removedRatio / totalRemainingWeight;

        remainingRows.forEach((row) => {
          const currentRatio = parseFloat(row.ratio || "0");
          const adjustedRatio = currentRatio + currentRatio * scalingFactor;
          row.ratio = `${adjustedRatio.toFixed(2)}%`;
        });

        selectedRow.ratio = "N/A";
        selectedRow.score = "N/A";
      } else if (typeof newValue === "number") {
        selectedRow.evaluation = newValue;
        selectedRow.score = parseFloat(selectedRow.ratio || "0") / 100 * newValue || "N/A";
      }

      selectedRow.evaluation = newValue;
      return updatedData;
    });
  };

  const totalScore = tableData.reduce((sum, row) => {
    if (typeof row.score === "number") {
      return sum + row.score;
    }
    return sum;
  }, 0);

  return (
    <StyledTable>
      <thead>
        <tr>
          <th colSpan={5} style={{ textAlign: 'center', fontSize: '24px' }}>H1-2024</th>
        </tr>
        <tr>
          <th></th>
          <th>Rated Criteria</th>
          <th>Ratio (%) 100%</th>
          <th>Evaluation</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
       {tableData.reduce<JSX.Element[]>((acc, row, index) => {
          const isFirstInSection =
            index === 0 || tableData[index - 1].section !== row.section;

          acc.push(
            <tr key={index}>
              {isFirstInSection && (
                <td rowSpan={tableData.filter((item) => item.section === row.section).length}>
                  {row.section}
                </td>
              )}
              <td>{row.criteria}</td>
              <td>{row.ratio}</td>
              <td>
                <select
                  value={row.evaluation}
                  onChange={(e) => handleEvaluationChange(index, e.target.value === "N/A" ? "N/A" : Number(e.target.value))}
                >
                  {row.ratio === "N/A" ? (
                    <option value="N/A">N/A</option>
                  ) : (
                    Array.from({ length: 11 }, (_, i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))
                  )}
                </select>
              </td>
              <td>{typeof row.score === "number" ? row.score.toFixed(2) : row.score}</td>
            </tr>
          );
          return acc;
        }, [])}
        <tr className="total-score-row">
          <td colSpan={4} style={{ textAlign: "right" }}>Total Score</td>
          <td>{totalScore.toFixed(2)}</td>
        </tr>
      </tbody>
    </StyledTable>
  );
};

export default Table;
