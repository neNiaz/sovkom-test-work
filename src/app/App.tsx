import { FC } from "react";
import MainLayout from "../shared/components/main-layout/main-layout.tsx";
import { FormControl } from "../shared/components/form/form-control.tsx";

interface Props {}

const App: FC<Props> = () => {
  const render = () => {
    return (
      <MainLayout>
        <FormControl />
      </MainLayout>
    );
  };

  return <div className={"App"}>{render()}</div>;
};

export default App;
