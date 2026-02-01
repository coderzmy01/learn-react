# 234. 获取表单数据

- 封装 url 获取的表单数据
- 请求接口获取表单信息
  - 国家名处理
- 错误处理

# 235. 创建新城市
- 创建城市表单
- datepicker

# useCallback 解决 useEffect 依赖问题

## 问题场景

在 `CityDetail` 组件中，useEffect 调用了从 Context 获取的 `loadCity` 函数：

```jsx
// src/components/CityDetail/index.jsx
function CityDetail() {
  const { id } = useParams();
  const { loadCity } = useCities();

  useEffect(() => {
    loadCity(id);
  }, [id]); // ⚠️ 缺少 loadCity 依赖
}
```

React 的 exhaustive-deps 规则会警告：`loadCity` 应该添加到依赖数组中。

## 为什么直接添加会导致死循环？

### 问题根源

在 `CitiesContext` 中，`loadCity` 是普通函数：

```jsx
// src/context/CitiesContext.jsx
const CitiesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // ❌ 每次渲染都会创建新的函数引用
  const loadCity = async (id) => {
    dispatch({ type: 'loading' });
    // ...
  };

  return (
    <CitiesContext.Provider value={{ loadCity, ... }}>
      {children}
    </CitiesContext.Provider>
  );
};
```

### 死循环流程

1. useEffect 检测到 `loadCity` 引用变化 → 执行 effect
2. `loadCity(id)` 调用 dispatch 更新 state → Provider 重新渲染
3. Provider 重新渲染创建新的 `loadCity` 引用 → useEffect 再次触发
4. 无限循环...

## 解决方案：使用 useCallback

### 1. 在 Context 中用 useCallback 包裹函数

```jsx
import { useCallback } from 'react';

const CitiesProvider = ({ children }) => {
  const [{ currentCity }, dispatch] = useReducer(reducer, initialState);

  // ✅ 使用 useCallback 稳定函数引用
  const loadCity = useCallback(async (id) => {
    // 优化：避免重复加载相同城市
    if (currentCity?.id === id) return;

    try {
      dispatch({ type: 'loading' });
      const res = await fetch(`http://localhost:3001/cities/${id}`);
      const data = await res.json();
      dispatch({ type: 'city/loaded', payload: data });
    } catch (error) {
      dispatch({ type: 'error', payload: error });
    }
  }, [currentCity]); // 依赖 currentCity

  // 同样处理其他函数
  const addCity = useCallback(async (city) => {
    // ...
  }, []);

  const deleteCity = useCallback(async (id) => {
    // ...
  }, []);

  return (
    <CitiesContext.Provider value={{ loadCity, addCity, deleteCity, ... }}>
      {children}
    </CitiesContext.Provider>
  );
};
```

### 2. 在组件中安全地添加依赖

```jsx
function CityDetail() {
  const { id } = useParams();
  const { loadCity } = useCities();

  useEffect(() => {
    loadCity(id);
  }, [id, loadCity]); // ✅ 现在可以安全地添加 loadCity
}
```

## useCallback 的工作原理

```jsx
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b], // 依赖数组
);
```

- **记忆化函数**：只有当依赖数组中的值变化时，才返回新的函数引用
- **稳定引用**：在依赖不变的情况下，多次渲染返回相同的函数引用
- **避免重复执行**：防止子组件或 useEffect 因函数引用变化而不必要地重新执行

## 依赖数组的选择

### loadCity 的依赖

```jsx
const loadCity = useCallback(async (id) => {
  if (currentCity?.id === id) return; // 使用了 currentCity
  // ...
}, [currentCity]); // 必须声明 currentCity 为依赖
```

- 函数内部使用了 `currentCity`，所以必须将其加入依赖数组
- 当 `currentCity` 变化时，函数会重新创建（获取新的闭包）

### addCity 的依赖

```jsx
const addCity = useCallback(async (city) => {
  // 只使用了 dispatch，不依赖任何 state
  dispatch({ type: 'city/added', payload: city });
}, []); // 空依赖数组
```

- 如果函数不依赖任何 props 或 state，使用空数组
- dispatch 是稳定的，不需要加入依赖

## 最佳实践

1. **Context 中的函数都应该用 useCallback 包裹**
   - 避免消费组件的 useEffect 重复执行
   - 提升性能

2. **正确声明依赖**
   - 函数内使用的所有 props 和 state 都要加入依赖数组
   - 不要为了消除警告而省略依赖

3. **优化检查**
   - 在函数开头添加条件判断，避免不必要的操作
   - 例如：`if (currentCity?.id === id) return;`

4. **不要过度使用**
   - 只在需要稳定引用的场景使用（传递给子组件、useEffect 依赖等）
   - 普通的事件处理函数通常不需要 useCallback

## 对比：不使用 useCallback 的后果

```jsx
// ❌ 错误做法 1：忽略依赖警告
useEffect(() => {
  loadCity(id);
}, [id]); // eslint-disable-line react-hooks/exhaustive-deps

// 问题：可能出现闭包陷阱，获取到过期的 state
```

```jsx
// ❌ 错误做法 2：直接添加未记忆化的函数
useEffect(() => {
  loadCity(id);
}, [id, loadCity]); // loadCity 每次渲染都变化 → 无限循环
```

```jsx
// ✅ 正确做法：使用 useCallback + 完整依赖
const loadCity = useCallback(async (id) => {
  // ...
}, [currentCity]);

useEffect(() => {
  loadCity(id);
}, [id, loadCity]); // 安全且符合 React 规则
```