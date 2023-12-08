import { act } from "@testing-library/react";

const flushEventLoop = () => act(() => Promise.resolve());

export default flushEventLoop;
