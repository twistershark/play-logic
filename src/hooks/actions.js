import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

export const ActionContext = createContext();

const ActionProvider = ({ children }) => {
  const [main, setMain] = useState([]);
  const [loop, setLoop] = useState([]);
  const [conditional, setConditional] = useState([]);

  // Quando o usuário entrar na fase, tudo vai estar zerado

  useEffect(() => {
    setMain([]);
    setLoop([]);
    setConditional([]);
  }, []);

  // Recebe o ID e a image da ação e adiciona no array das ações main
  const handleAddToMain = useCallback((id, image) => {
    setMain((prevState) => ([...prevState, { id, image }]));
  }, []);

  // Recebe o ID e a image da ação e adiciona no array das ações loop
  const handleAddToLoop = useCallback((id, image) => {
    setLoop((prevState) => ([...prevState, { id, image }]));
  }, []);

  // Recebe o ID e a image da ação e adiciona no array das ações conditional
  const handleAddToConditional = useCallback((id, image) => {
    setConditional((prevState) => ([...prevState, { id, image }]));
  }, []);

  // Adiciona as ações do loop na main TIMES vezes

  const handleAddLoopToMain = useCallback((times) => {
    for (let i = 1; i <= times; i + 1) {
      setMain((prevState) => ([...prevState, ...loop]));
    }
  }, [loop]);

  // Adiciona as ações do conditional na main.

  const handleAddConditionalToMain = useCallback(() => {
    setMain((prevState) => ([...prevState, ...conditional]));
  }, [conditional]);

  // Reseta todos os arrays de ações
  const handleReset = useCallback(() => {
    setMain([]);
    setLoop([]);
    setConditional([]);
  }, []);

  return (
    <ActionContext.Provider
      value={{
        main,
        loop,
        conditional,
        handleAddToMain,
        handleAddToLoop,
        handleAddToConditional,
        handleAddLoopToMain,
        handleAddConditionalToMain,
        handleReset,
      }}
    >
      {children}
    </ActionContext.Provider>
  );
};

function useAction() {
  const context = useContext(ActionContext);

  if (!context) {
    throw new Error('useAction must be used within an ActionProvider');
  }

  return context;
}

export { useAction, ActionProvider };
