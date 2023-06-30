import { on, createReducer } from '@ngrx/store';
import { getTodayAction } from '../action/today.action';

export interface DataType {
  data: any;
}

export const InitialData: DataType = {
  data: '',
};

export const todayReducer = createReducer(
  InitialData,
  on(getTodayAction, (state, { data: today }) => ({
    ...state,
    data: today,
  }))
);

// InitialDataは、Reducerの初期状態を示す変数または定数です。
// この初期状態は、アプリケーションの最初の状態です。

// on(getTodayAction, (state, { data: today }) => ({ ...state, data: today })):
// on関数は、Actionと対応するReducerの処理を定義します。
// getTodayActionというActionが発行された場合に、第2引数の処理が実行されます。

// state: 現在の状態（ステート）を表します。
// { data: today }: Actionから受け取るデータ（payload）です。{ data: today }という形式で受け取り、
// todayという名前で参照できます。
// => ({ ...state, data: today }): Reducerの処理本体です。
// 現在の状態を展開して新しいオブジェクトを作成し、dataプロパティをtodayで上書きします。
// つまり、stateの状態を保持しながら、dataを新しい値で更新します。
// Reducerの役割は、現在の状態とActionから受け取ったデータをもとに新しい状態を生成することです。
// この場合、getTodayActionが発行されたときに、dataプロパティを更新して新しい状態を生成しています。
