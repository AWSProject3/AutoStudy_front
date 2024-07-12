import React from 'react';

const GradeResult = ({ result }) => {
  const { score, total_score, summary, detailed_feedback, positive_feedback, suggestions, best_practice_code, best_practice_explanation } = result;

  return (
    <div className="mt-4">
      <h5>채점 결과</h5>
      <p><strong>총점:</strong> {total_score}</p>
      <p><strong>요약:</strong> {summary}</p>
      
      <h6>세부 점수:</h6>
      <ul>
        <li>정확성: {score.accuracy}</li>
        <li>효율성: {score.efficiency}</li>
        <li>가독성: {score.readability}</li>
        <li>PEP8 준수: {score.pep8_compliance}</li>
        <li>모듈화 및 재사용성: {score.modularity_reusability}</li>
        <li>예외 처리: {score.exception_handling}</li>
      </ul>

      <h6>상세 피드백:</h6>
      <ul>
        <li>정확성: {detailed_feedback.accuracy}</li>
        <li>효율성: {detailed_feedback.efficiency}</li>
        <li>가독성: {detailed_feedback.readability}</li>
        <li>PEP8 준수: {detailed_feedback.pep8_compliance}</li>
        <li>모듈화 및 재사용성: {detailed_feedback.modularity_reusability}</li>
        <li>예외 처리: {detailed_feedback.exception_handling}</li>
      </ul>

      <p><strong>긍정적인 피드백:</strong> {positive_feedback}</p>

      <h6>제안사항:</h6>
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index}>{suggestion}</li>
        ))}
      </ul>

      <h6>모범 사례 코드:</h6>
      <pre>{best_practice_code}</pre>

      <p><strong>모범 사례 설명:</strong> {best_practice_explanation}</p>
    </div>
  );
};

export default GradeResult;