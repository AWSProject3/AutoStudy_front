import React from 'react';

const GradeResult = ({ result }) => {
  const { score, total_score, summary, detailed_feedback, positive_feedback, suggestions, best_practice_code, best_practice_explanation } = result;

  return (
    <div className="card bg-light text-dark">
      <div className="card-body">
        <h5 className="card-title">채점 결과</h5>
        <hr />
        <div className="mb-3">
          <p><strong>총점:</strong> {total_score}/100</p>
          <p><strong>요약:</strong> {summary}</p>
        </div>
        
        <hr />
        <div className="mb-3">
          <h6>세부 점수:</h6>
          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              정확성 <span className="badge bg-primary rounded-pill">{score.accuracy}/20</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              효율성 <span className="badge bg-primary rounded-pill">{score.efficiency}/20</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              가독성 <span className="badge bg-primary rounded-pill">{score.readability}/15</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              PEP8 준수 <span className="badge bg-primary rounded-pill">{score.pep8_compliance}/15</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              모듈화 및 재사용성 <span className="badge bg-primary rounded-pill">{score.modularity_reusability}/15</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              예외 처리 <span className="badge bg-primary rounded-pill">{score.exception_handling}/15</span>
            </li>
          </ul>
        </div>

        <hr />
        <div className="mb-3">
          <h6>상세 피드백:</h6>
          <ul className="list-group">
            <li className="list-group-item"><strong>정확성:</strong> {detailed_feedback.accuracy}</li>
            <li className="list-group-item"><strong>효율성:</strong> {detailed_feedback.efficiency}</li>
            <li className="list-group-item"><strong>가독성:</strong> {detailed_feedback.readability}</li>
            <li className="list-group-item"><strong>PEP8 준수:</strong> {detailed_feedback.pep8_compliance}</li>
            <li className="list-group-item"><strong>모듈화 및 재사용성:</strong> {detailed_feedback.modularity_reusability}</li>
            <li className="list-group-item"><strong>예외 처리:</strong> {detailed_feedback.exception_handling}</li>
          </ul>
        </div>

        <hr />
        <div className="mb-3">
          <h6>긍정적인 피드백:</h6>
          <p>{positive_feedback}</p>
        </div>

        <hr />
        <div className="mb-3">
          <h6>제안사항:</h6>
          <ul className="list-group">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="list-group-item">{suggestion}</li>
            ))}
          </ul>
        </div>

        <hr />
        <div className="mb-3">
          <h6>모범 사례 코드:</h6>
          <pre className="bg-dark text-light p-2 rounded">{best_practice_code}</pre>
        </div>

        <hr />
        <div className="mb-3">
          <h6>모범 사례 설명:</h6>
          <p>{best_practice_explanation}</p>
        </div>
      </div>
    </div>
  );
};

export default GradeResult;